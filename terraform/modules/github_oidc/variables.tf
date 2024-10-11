variable "terraform_state_s3_bucket_name" {
  description = "The name of the S3 bucket to store the Terraform state file"
  type        = string
}

variable "aws_region" {
  description = "The AWS region to deploy the resources"
  type        = string
}

variable "aws_account_id" {
  description = "The AWS account ID"
  type        = string
}
