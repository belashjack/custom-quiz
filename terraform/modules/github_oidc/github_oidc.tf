# Define the OIDC provider for GitHub Actions
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = ["a1089bd8e2fe39b00b67a891a35c108d0c26b24c"]
}

# Define the IAM role that GitHub Actions can assume
resource "aws_iam_role" "github_actions_oidc_role" {
  name = "github-actions-oidc-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity",
        Effect = "Allow",
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn,
        },
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:sub" = "repo:belashjack/custom-quiz:ref:refs/heads/main"
          }
        }
      },
    ],
  })
}

# Define the IAM policy for S3 access
resource "aws_iam_policy" "github_actions_oidc_s3_policy" {
  name        = "github-actions-oidc-s3-policy"
  description = "Policy for GitHub Actions OIDC to access S3 bucket for Terraform state"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource = [
          "arn:aws:s3:::${var.terraform_state_s3_bucket_name}",
          "arn:aws:s3:::${var.terraform_state_s3_bucket_name}/*"
        ]
      }
    ]
  })
}

# Attach the S3 policy to the GitHub Actions role
resource "aws_iam_role_policy_attachment" "attach_github_actions_oidc_s3_policy" {
  policy_arn = aws_iam_policy.github_actions_oidc_s3_policy.arn
  role       = aws_iam_role.github_actions_oidc_role.name
}

# Define the IAM policy for DynamoDB access
resource "aws_iam_policy" "github_actions_oidc_dynamodb_policy" {
  name        = "github-actions-oidc-dynamodb-policy"
  description = "Policy for GitHub Actions OIDC to access DynamoDB for state locking"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem"
        ],
        Resource = "arn:aws:dynamodb:${var.aws_region}:${var.aws_account_id}:table/custom-quiz-tfstate-lock"
      }
    ]
  })
}

# Attach the DynamoDB policy to the GitHub Actions role
resource "aws_iam_role_policy_attachment" "attach_github_actions_oidc_dynamodb_policy" {
  policy_arn = aws_iam_policy.github_actions_oidc_dynamodb_policy.arn
  role       = aws_iam_role.github_actions_oidc_role.name
}

# New policy granting the necessary IAM actions to the OIDC role
resource "aws_iam_policy" "github_actions_oidc_iam_policy" {
  name        = "github-actions-oidc-iam-policy"
  description = "Policy granting IAM permissions for GitHub Actions OIDC role to manage IAM resources."

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "iam:GetRole",
          "iam:GetPolicy",
          "iam:GetPolicyVersion",
          "iam:ListRolePolicies",
          "iam:ListAttachedRolePolicies",
          "iam:GetOpenIDConnectProvider"
        ],
        Resource = [
          "arn:aws:iam::${var.aws_account_id}:role/github-actions-oidc-role",
          "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-s3-policy",
          "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-dynamodb-policy",
          "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-iam-policy",
          "arn:aws:iam::${var.aws_account_id}:oidc-provider/token.actions.githubusercontent.com"
        ]
      }
    ]
  })
}

# Attach the IAM policy to the OIDC role
resource "aws_iam_role_policy_attachment" "github_actions_oidc_iam_policy_attachment" {
  role       = aws_iam_role.github_actions_oidc_role.name
  policy_arn = aws_iam_policy.github_actions_oidc_iam_policy.arn
}
