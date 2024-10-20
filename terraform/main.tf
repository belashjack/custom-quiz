terraform {
  backend "s3" {
    bucket         = "custom-quiz-tfstate"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "custom-quiz-tfstate-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

module "github_oidc" {
  source                         = "./modules/github_oidc"
  terraform_state_s3_bucket_name = "custom-quiz-tfstate"
  aws_region                     = var.aws_region
  aws_account_id                 = var.aws_account_id
}

# Define the S3 bucket for the application
resource "aws_s3_bucket" "custom_quiz_app" {
  bucket = "custom-quiz-app"

  tags = {
    Project = var.project_name
  }
}

resource "aws_s3_bucket_website_configuration" "custom_quiz_app_website_configuration" {
  bucket = aws_s3_bucket.custom_quiz_app.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "custom_quiz_app_public_access_block" {
  bucket = aws_s3_bucket.custom_quiz_app.id

  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "custom_quiz_app_policy" {
  bucket = aws_s3_bucket.custom_quiz_app.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.custom_quiz_identity.iam_arn
        },
        Action   = "s3:GetObject",
        Resource = "${aws_s3_bucket.custom_quiz_app.arn}/*"
      }
    ]
  })
}

# Define the S3 bucket for assets
resource "aws_s3_bucket" "custom_quiz_assets" {
  bucket = "custom-quiz-assets"

  tags = {
    Project = var.project_name
  }
}

resource "aws_s3_bucket_public_access_block" "custom_quiz_assets_public_access_block" {
  bucket = aws_s3_bucket.custom_quiz_assets.bucket

  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "custom_quiz_assets_policy" {
  bucket = aws_s3_bucket.custom_quiz_assets.bucket

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.custom_quiz_identity.iam_arn
        },
        Action   = "s3:GetObject",
        Resource = "${aws_s3_bucket.custom_quiz_assets.arn}/*"
      }
    ]
  })
}

resource "aws_route53_zone" "custom_quiz_zone" {
  name = var.domain_name

  tags = {
    Project = var.project_name
  }
}

resource "aws_cloudfront_distribution" "custom_quiz_app_distribution" {
  origin {
    domain_name = aws_s3_bucket.custom_quiz_app.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.custom_quiz_app.bucket
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.custom_quiz_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.custom_quiz_app.bucket

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 60
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.custom_quiz_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [var.domain_name, "www.${var.domain_name}"]

  logging_config {
    bucket = aws_s3_bucket.custom_quiz_cloudfront_logs.bucket_domain_name
  }

  tags = {
    Project = var.project_name
  }
}

resource "aws_cloudfront_origin_access_identity" "custom_quiz_identity" {
  comment = "OAI for serving content from buckets"
}

resource "aws_acm_certificate" "custom_quiz_certificate" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = ["www.${var.domain_name}", "assets.${var.domain_name}"]

  tags = {
    Project = var.project_name
  }
}

resource "aws_route53_record" "custom_quiz_certificate_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.custom_quiz_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = aws_route53_zone.custom_quiz_zone.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 300
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "custom_quiz_certificate_validation" {
  certificate_arn         = aws_acm_certificate.custom_quiz_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.custom_quiz_certificate_validation_record : record.fqdn]
}

resource "aws_route53_record" "custom_quiz_app_cloudfront" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.custom_quiz_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.custom_quiz_app_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "custom_quiz_zone_app_www_cloudfront" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.custom_quiz_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.custom_quiz_app_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket" "custom_quiz_cloudfront_logs" {
  bucket = "custom-quiz-cloudfront-logs"

  tags = {
    Project = var.project_name
  }
}

resource "aws_s3_bucket_ownership_controls" "custom_quiz_cloudfront_logs_bucket_ownership_controls" {
  bucket = aws_s3_bucket.custom_quiz_cloudfront_logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_policy" "custom_quiz_cloudfront_logs_policy" {
  bucket = aws_s3_bucket.custom_quiz_cloudfront_logs.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = "s3:PutObject",
        Resource = "${aws_s3_bucket.custom_quiz_cloudfront_logs.arn}/*",
        Condition = {
          StringLike = {
            "aws:Referer" = aws_cloudfront_distribution.custom_quiz_app_distribution.id
          }
        }
      }
    ]
  })
}

resource "aws_cloudfront_distribution" "custom_quiz_assets_distribution" {
  origin {
    domain_name = aws_s3_bucket.custom_quiz_assets.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.custom_quiz_assets.bucket

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.custom_quiz_identity.cloudfront_access_identity_path
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.custom_quiz_assets.bucket

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 60
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.custom_quiz_certificate.arn
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = false
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = ["assets.${var.domain_name}"]

  tags = {
    Project = var.project_name
  }
}

resource "aws_route53_record" "custom_quiz_assets_cloudfront" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = "assets.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.custom_quiz_assets_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.custom_quiz_assets_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_lambda_function" "custom_quiz_logging" {
  filename         = data.archive_file.custom_quiz_logging_archive.output_path
  function_name    = "customQuizLogging"
  role             = aws_iam_role.lambda_basic_execution_role.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.custom_quiz_logging_archive.output_base64sha256

  tags = {
    Project = var.project_name
  }
}

data "archive_file" "custom_quiz_logging_archive" {
  type        = "zip"
  source_dir  = "../lambdas/custom_quiz_logging"
  output_path = "../lambdas/custom_quiz_logging.zip"
}

resource "aws_iam_role" "lambda_basic_execution_role" {
  name = "lambda-basic-execution-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_api_gateway_rest_api" "custom_quiz_api_gateway_rest_api" {
  name        = "custom-quiz-api"
  description = "Custom Quiz REST API"

  tags = {
    Project = var.project_name
  }
}

resource "aws_api_gateway_resource" "custom_quiz_api_gateway" {
  rest_api_id = aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.id
  parent_id   = aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.root_resource_id
  path_part   = "log"
}

resource "aws_api_gateway_method" "custom_quiz_api_method_post_logs" {
  rest_api_id   = aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.id
  resource_id   = aws_api_gateway_resource.custom_quiz_api_gateway.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "custom_quiz_api_gateway_integration" {
  rest_api_id             = aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.id
  resource_id             = aws_api_gateway_resource.custom_quiz_api_gateway.id
  http_method             = aws_api_gateway_method.custom_quiz_api_method_post_logs.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.custom_quiz_logging.invoke_arn
}

resource "aws_api_gateway_deployment" "custom_quiz_api_gateway_deployment" {
  depends_on  = [aws_api_gateway_integration.custom_quiz_api_gateway_integration]
  rest_api_id = aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.custom_quiz_logging.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.custom_quiz_api_gateway_rest_api.execution_arn}/log/POST"
}
