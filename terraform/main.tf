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

# Define the S3 bucket for images
resource "aws_s3_bucket" "custom_quiz_images" {
  bucket = "custom-quiz-images"

  tags = {
    Project = var.project_name
  }
}
