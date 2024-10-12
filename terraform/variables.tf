variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "Custom Quiz"
}

variable "aws_region" {
  description = "The AWS region to deploy the resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_account_id" {
  description = "The AWS account ID"
  type        = string
  default     = "574783120239"
}

variable "domain_name" {
  description = "The domain name used for custom quiz application"
  type        = string
  default     = "happybirthdaydianayasenko.com"
}
