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

# Define the S3 bucket for images
resource "aws_s3_bucket" "custom_quiz_images" {
  bucket = "custom-quiz-images"

  tags = {
    Project = var.project_name
  }
}

resource "aws_s3_bucket_public_access_block" "custom_quiz_images_public_access_block" {
  bucket = aws_s3_bucket.custom_quiz_images.bucket

  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "custom_quiz_images_policy" {
  bucket = aws_s3_bucket.custom_quiz_images.bucket

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.custom_quiz_images.arn}/*"
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
    acm_certificate_arn      = aws_acm_certificate.custom_quiz_app_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [var.domain_name, "www.${var.domain_name}"]

  tags = {
    Project = var.project_name
  }
}

resource "aws_cloudfront_origin_access_identity" "custom_quiz_identity" {
  comment = "OAI for serving content from custom_quiz_app bucket"
}

resource "aws_acm_certificate" "custom_quiz_app_certificate" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = ["www.${var.domain_name}"]

  tags = {
    Project = var.project_name
  }
}

resource "aws_route53_record" "custom_quiz_app_certificate_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.custom_quiz_app_certificate.domain_validation_options : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "custom_quiz_app_certificate_validation" {
  certificate_arn         = aws_acm_certificate.custom_quiz_app_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.custom_quiz_app_certificate_validation_record : record.fqdn]
}

resource "aws_route53_record" "custom_quiz_zone_cloudfront" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.custom_quiz_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.custom_quiz_app_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "custom_quiz_zone_www_cloudfront" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.custom_quiz_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.custom_quiz_app_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
