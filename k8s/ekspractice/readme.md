# Kubernetes Infrastructure with Terraform

The following directory structure represents the Terraform configuration files and modules required to create a Kubernetes infrastructure on AWS using EKS (Elastic Kubernetes Service). The setup is modularized for better organization and reusability.

```plaintext
eks-infra/
├── main.tf               # Main entry point for Terraform configuration
├── variables.tf          # Input variables for the infrastructure
├── outputs.tf            # Outputs from the infrastructure
├── terraform.tfvars      # Variable values specific to this environment
├── provider.tf           # Provider configuration (e.g., AWS)
└── modules/              # Reusable modules for different components
    ├── vpc/              # Module for Virtual Private Cloud (VPC)
    │   ├── main.tf       # VPC-specific Terraform configuration
    │   ├── variables.tf  # Input variables for the VPC module
    │   └── outputs.tf    # Outputs from the VPC module
    ├── iam/              # Module for Identity and Access Management (IAM)
    │   ├── main.tf       # IAM-specific Terraform configuration
    │   ├── variables.tf  # Input variables for the IAM module
    │   └── outputs.tf    # Outputs from the IAM module
    └── eks/              # Module for Elastic 
    Kubernetes Service (EKS)
        ├── main.tf       # EKS-specific Terraform configuration
        ├── variables.tf  # Input variables for the EKS module
        └── outputs.tf    # Outputs from the EKS module
```

This structure ensures a clean separation of concerns, making it easier to manage and scale the infrastructure.  