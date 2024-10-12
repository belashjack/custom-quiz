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

# Define the IAM policy for access to the S3 bucket with the Terraform state file
resource "aws_iam_policy" "github_actions_oidc_tf_state_s3_policy" {
  name        = "github-actions-oidc-tf-state-s3-policy"
  description = "Policy for GitHub Actions OIDC to access the S3 bucket for Terraform state file"
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

resource "aws_iam_role_policy_attachment" "attach_github_actions_oidc_tf_state_s3_policy" {
  policy_arn = aws_iam_policy.github_actions_oidc_tf_state_s3_policy.arn
  role       = aws_iam_role.github_actions_oidc_role.name
}

# Define the IAM policy for access to the DynamoDB table for Terraform state locking
resource "aws_iam_policy" "github_actions_oidc_tf_state_dynamodb_policy" {
  name        = "github-actions-oidc-tf-state-dynamodb-policy"
  description = "Policy for GitHub Actions OIDC to access the DynamoDB table for Terraform state locking"
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

resource "aws_iam_role_policy_attachment" "attach_github_actions_oidc_tf_state_dynamodb_policy" {
  policy_arn = aws_iam_policy.github_actions_oidc_tf_state_dynamodb_policy.arn
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
          "iam:ListPolicyVersions",
          "iam:ListRolePolicies",
          "iam:ListAttachedRolePolicies",
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:role/github-actions-oidc-role"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetPolicy",
          "iam:GetPolicyVersion"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-tf-state-s3-policy"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetPolicy",
          "iam:GetPolicyVersion"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-tf-state-dynamodb-policy"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetPolicy",
          "iam:GetPolicyVersion"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-iam-policy"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetPolicy",
          "iam:GetPolicyVersion"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-s3-policy"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetPolicy",
          "iam:GetPolicyVersion"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:policy/github-actions-oidc-route53-policy"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:GetOpenIDConnectProvider"
        ],
        Resource = "arn:aws:iam::${var.aws_account_id}:oidc-provider/token.actions.githubusercontent.com"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_oidc_iam_policy_attachment" {
  role       = aws_iam_role.github_actions_oidc_role.name
  policy_arn = aws_iam_policy.github_actions_oidc_iam_policy.arn
}

resource "aws_iam_role_policy_attachment" "github_actions_oidc_s3_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  role       = aws_iam_role.github_actions_oidc_role.name
}

# New policy granting the necessary Route 53 actions to the OIDC role
resource "aws_iam_policy" "github_actions_oidc_route53_policy" {
  name        = "github-actions-oidc-route53-policy"
  description = "Allows GitHub Actions to manage Route 53 resources."

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = "route53:*",
        Resource = "*",
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_oidc_route53_attachment" {
  policy_arn = aws_iam_policy.github_actions_oidc_route53_policy.arn
  role       = aws_iam_role.github_actions_oidc_role.name
}
