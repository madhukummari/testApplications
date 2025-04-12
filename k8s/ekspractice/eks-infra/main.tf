module "vpc" {
  source         = "./modules/vpc"
  name           = var.name
  vpc_cidr       = var.vpc_cidr
  public_subnets = var.public_subnets
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"] # Replace with your desired AZs
}

module "iam" {
  source = "./modules/iam"
}

module "eks" {
  source           = "./modules/eks"
  cluster_name     = var.name
  subnet_ids       = module.vpc.public_subnet_ids
  cluster_role_arn = module.iam.eks_cluster_role_arn
  ssh_key_name     = var.ssh_key_name
  node_role_arn    = module.iam.eks_node_role_arn
  vpc_id           = module.vpc.vpc_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}
