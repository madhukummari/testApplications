module "vpc" {
  source         = "./modules/vpc"
  name           = var.name
  vpc_cidr       = var.vpc_cidr
  public_subnets = var.public_subnets
  azs            = var.azs
}

module "iam" {
  source = "./modules/iam"
}

module "eks" {
  source           = "./modules/eks"
  cluster_name     = var.name
  subnet_ids       = module.vpc.public_subnet_ids
  cluster_role_arn = module.iam.eks_cluster_role_arn
  node_role_arn    = module.iam.eks_node_role_arn
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}
