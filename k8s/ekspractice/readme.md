# Kubernetes Infrastructure with Terraform

## Directory Structure for Terraform Configuration

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
    └── eks/              # Module for Elastic Kubernetes Service (EKS)
        ├── main.tf       # EKS-specific Terraform configuration
        ├── variables.tf  # Input variables for the EKS module
        └── outputs.tf    # Outputs from the EKS module
```

This structure ensures a clean separation of concerns, making it easier to manage and scale the infrastructure.

## Connecting to AWS EKS from Local Terminal

To connect to your AWS EKS cluster using your local terminal, follow these steps:

1. **Install AWS CLI and kubectl**  
    Ensure you have the AWS CLI and `kubectl` installed on your local machine. You can install them using the following commands:
    ```bash
    # Install AWS CLI
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /

    # Install kubectl
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/$(uname | tr '[:upper:]' '[:lower:]')/amd64/kubectl"
    chmod +x kubectl
    sudo mv kubectl /usr/local/bin/
    ```

2. **Authenticate with AWS**  
    Configure your AWS CLI with the appropriate credentials:
    ```bash
    aws configure
    ```
    Provide your AWS Access Key, Secret Key, region, and output format when prompted.

3. **Update kubeconfig**  
    Use the AWS CLI to update your `kubeconfig` file with the EKS cluster information:
    ```bash
    aws eks --region <your-region> update-kubeconfig --name <your-cluster-name>
    ```

4. **Verify Connection**  
    Test the connection to your EKS cluster:
    ```bash
    kubectl get nodes
    ```
    This command should return the list of nodes in your EKS cluster.

By following these steps, you can manage your Kubernetes cluster on AWS EKS directly from your local terminal.

## EKS Project Diagram

```plaintext
+----------------------+
|   AWS EKS Control    |
|     Plane (AWS)      |
+----------------------+
          |
+---------|------------------+
|         |                  |
|  ENIs in your Subnets      |
|         |                  |
+-------------------------------+  
|     Your VPC (10.0.0.0/16)     |
+-------------------------------+
      |           |            |
+-----------+ +-----------+ +-----------+
| Subnet A  | | Subnet B  | | Subnet C  | (public)
| 10.0.1.0/24| | 10.0.2.0/24| | 10.0.3.0/24|
+-----------+ +-----------+ +-----------+
     |              |             |
 +--------+    +--------+    +--------+
 | EC2    |    | EC2    |    | EC2    |  <-- EKS Worker Nodes
 | Node 1 |    | Node 2 |    | Node 3 |  (t3.medium or other)
 +--------+    +--------+    +--------+
     |              |             |
  Route Table with 0.0.0.0/0 → Internet Gateway
              |
     +------------------+
     | Internet Gateway |
     +------------------+
              |
        +-----------+
        |  Internet |
        +-----------+
```

## Troubleshooting Deployment Issues

If you encounter an error while applying Kubernetes manifests, such as:

```plaintext
error: error validating "mongodb-deployment.yaml": error validating data: failed to download openapi: Get "https://FA46A88A0C289A918B1CEB9218848332.yl4.us-east-1.eks.amazonaws.com/openapi/v2?timeout=32s": dial tcp: lookup FA46A88A0C289A918B1CEB9218848332.yl4.us-east-1.eks.amazonaws.com: no such host; if you choose to ignore these errors, turn validation off with --validate=false
```

This error typically occurs when your kubeconfig is not updated with the EKS cluster information. Before applying Kubernetes manifests, ensure that your kubeconfig is correctly configured by running the following command:

```bash
aws eks --region <your-region> update-kubeconfig --name <your-cluster-name>
```

This command updates your kubeconfig file with the necessary details to connect to your EKS cluster. After updating the kubeconfig, retry applying the manifest:

```bash
kubectl apply -f mongodb-deployment.yaml
```

If you still encounter issues, you can bypass validation temporarily by adding the `--validate=false` flag:

```bash
kubectl apply -f mongodb-deployment.yaml --validate=false
```

madhu@Madhus-MacBook-Pro manifestfiles % kubectl apply -f mongodb-deployment.yaml 
deployment.apps/mongodb-deployment unchanged
service/mongodb-service created
error: resource mapping not found for name: "mongodb-pv-claim" namespace: "" from "mongodb-deployment.yaml": no matches for kind "persistentVolumeClaim" in version "v1"
ensure CRDs are installed first
madhu@Madhus-MacBook-Pro manifestfiles % 

# Applying Persistent Volume Claim (PVC) Before Deployment

If your deployment file includes both the Persistent Volume Claim (PVC) and other resources like Deployments or Services, you need to apply the PVC first to ensure it is created before other resources that depend on it. Follow these steps:

1. **Extract the PVC from the Deployment File**  
    Open your `mongodb-deployment.yaml` file and locate the section defining the PVC. Copy this section into a separate file, for example, `mongodb-pvc.yaml`.

2. **Apply the PVC**  
    Use the `kubectl apply` command to create the PVC:
    ```bash
    kubectl apply -f mongodb-pvc.yaml
    ```

3. **Verify the PVC**  
    Ensure the PVC is created and bound to a Persistent Volume (PV):
    ```bash
    kubectl get pvc
    ```

    The output should show the PVC with a `Bound` status.

4. **Apply the Remaining Resources**  
    After the PVC is successfully created, apply the original deployment file:
    ```bash
    kubectl apply -f mongodb-deployment.yaml
    ```

```yaml
## Example Persistent Volume Claim (PVC) Configuration

Below is an example configuration for a Persistent Volume Claim (PVC) that can be used to request storage for your MongoDB deployment:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: mongodb-pv-claim
spec:
    accessModes:
        - ReadWriteOnce
    resources:
        requests:
            storage: 1Gi
```

Save this configuration in a file named `mongodb-pvc.yaml` and apply it using the following command:

```bash
kubectl apply -f mongodb-pvc.yaml
```

This will create the PVC and ensure that the required storage is available for your MongoDB deployment.
```
## Understanding Persistent Volume Claims (PVC) with a Gym Locker Analogy

Think of Kubernetes storage as a gym with lockers:

- **Persistent Volume (PV):** The lockers in the gym, each with a specific size and features (e.g., small, medium, large, with or without a lock).
- **Persistent Volume Claim (PVC):** The request you make to the gym staff for a locker that meets your needs (e.g., "I need a medium-sized locker with a lock").
- **Storage Class:** The predefined rules or templates for lockers (e.g., "all medium lockers have locks and are located near the entrance").

### Key Points:
1. A **PVC** is like asking for a locker that matches your requirements.
2. Kubernetes finds a **PV** (locker) that fits your PVC (request) and assigns it to you.
3. The **Storage Class** defines the type of lockers available and their features.

This analogy simplifies how Kubernetes manages storage: your application (gym member) requests storage (locker) without worrying about the backend details, ensuring a seamless experience.

