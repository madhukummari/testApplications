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
  vpc_id           = module.vpc.vpc_id
  subnet_ids       = module.vpc.public_subnet_ids
  cluster_role_arn = module.iam.eks_cluster_role_arn
  node_role_arn    = module.iam.eks_node_role_arn
  ssh_key_name     = var.ssh_key_name
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}
