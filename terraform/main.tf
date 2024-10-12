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

resource "aws_s3_bucket_public_access_block" "custom_quiz_app" {
  bucket = aws_s3_bucket.custom_quiz_app.id

  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "custom_quiz_app_policy" {
  bucket = aws_s3_bucket.custom_quiz_app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.custom_quiz_app.arn}/*"
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

resource "aws_s3_bucket_public_access_block" "custom_quiz_images_block" {
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
  name = "happybirthdaydianayasenko.com"

  tags = {
    Project = var.project_name
  }
}

resource "aws_route53_record" "custom_quiz_zone_record" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = "happybirthdaydianayasenko.com"
  type    = "A"

  alias {
    name                   = aws_s3_bucket_website_configuration.custom_quiz_app_website_configuration.website_endpoint
    zone_id                = aws_s3_bucket.custom_quiz_app.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "custom_quiz_zone_www_record" {
  zone_id = aws_route53_zone.custom_quiz_zone.zone_id
  name    = "www.happybirthdaydianayasenko.com"
  type    = "CNAME"
  ttl     = 300
  records = [aws_route53_record.custom_quiz_zone_record.fqdn]
}
