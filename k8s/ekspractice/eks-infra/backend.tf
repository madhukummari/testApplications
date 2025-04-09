terraform {
  backend "s3" {
    bucket         = "stationary-remote-backend"
    key            = "eks/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform_lock"
  }
}
