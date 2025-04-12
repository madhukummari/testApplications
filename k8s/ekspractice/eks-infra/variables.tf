variable "region" {
  default = "us-east-1"
}
variable "name" {
  default = "demo-eks"
}
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
variable "public_subnets" {
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "ssh_key_name"{

  description = "SSH key name for EC2 instances"
  type        = string
  default     = "keypair2025"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}