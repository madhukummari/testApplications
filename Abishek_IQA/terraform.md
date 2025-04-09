
madhu/Interviews/interview material/Terraform_Fresher_to_Experienced.pdf

Q1. how do you create tf config file for  the already created resources in terraform:
A. using terraform import
    create a terraform file
    add provider and import block specifying the name of the resource on the aws console
    ```
        import {
            id = "i-asidfuajwikf"
            to = aws_instance_testEc2
        }
    ```
     terraform plan -generate-config-out=generated_resource.tf   ## this will genrate the terraform configuration file 
     terraform import aws_instance.testEc2 i-asidfuajwikf

     then plan and apply

     challenges faced in this scenario
2. Challenge: Terraform State Without Code
Problem: terraform import only updates the state file. It doesn’t generate .tf code, so you must manually write the configuration to match the real-world setup.

Solution: Use terraformer (a community tool) or AWS documentation to help write the correct resource blocks. Validate by running terraform plan after importing.

3. Challenge: Matching Resource Attributes
Problem: If your .tf code doesn’t exactly match the live resource config, Terraform will show changes you don't intend to make.

Solution: Manually inspect resource properties (via console or CLI), and make sure your .tf matches what's actually deployed.
4. Challenge: Complex Dependencies
Problem: Resources may have dependencies (e.g., security groups, IAM roles) that must be imported and written in the right order.

Solution: Plan the import sequence, starting with independent resources first. Split resources into modules or logical groups to manage complexity.

5. Challenge: Potential Downtime or Drift
Problem: Incorrect Terraform code can cause drift or unintentional changes when applied.

Solution: Use terraform plan carefully. Avoid terraform apply until you're confident in the code. Always use version control (e.g., Git) to track changes.


2. how do controll manual changes in the organisation | how to detect drifts

A.  use refresh commands to detect the drifts and act acconrdinly this refresh should be ran on a schedule (cron).

3. what Iac ? why terraform
A.  it works on a principle called API as code infrastructure terraform is one single tool that can automate entire infrastructure.


4. what are modules in terraform
    A.  it is a logical grouping resources which enforces the reusablity of the code making infradevelopers to reuse the code and create with different parameters.

5. what is statefile in terraform
A.  key component of terraform which maintain the state and track the changes of the terraform infrastructure 

6. what are some most used terraform commands
A   terraform plan, terraform refresh, terraform apply, terraform import 

7. what is terraform backend 
A.  
    "A Terraform backend is where Terraform stores its state file. By default, it stores the state locally on your      machine, but in real-world projects, we often configure a remote backend like AWS S3, Azure Blob, or Terraform Cloud. This allows teams to share and manage infrastructure safely. It also supports features like state locking, versioning, and collaboration, which are essential to avoid conflicts and maintain consistency."  

    🔹 Types of Backends:
            Local (default): State is stored in a local .tfstate file.
            Remote backends: Like:
                AWS S3 + DynamoDB (very common)
                Terraform Cloud
                Consul
                Azure Blob Storage\
                Google Cloud Storage

    🔹 Benefits of Remote Backends:
            State Locking: Prevents simultaneous runs (DynamoDB in AWS setup).
            Versioning: Keeps history of state file changes.
            Collaboration: Everyone on the team works with the same source of truth.
            Security: Encrypted state storage and restricted access.




8. what is terraform remote backend
A.  
        "To configure a remote backend in Terraform, I define it in the backend block inside the terraform configuration. For example, if I’m using AWS, I’d use an S3 bucket for storing the state and DynamoDB for state locking. Here’s a simple example:"

        ```
        terraform {
            backend "s3" {
                bucket         = "my-terraform-state-bucket"
                key            = "envs/prod/terraform.tfstate"
                region         = "us-east-1"
                dynamodb_table = "terraform-locks"
                encrypt        = true
            }
            }

        ```
9. how do handle secrets in terraform
A.  "In Terraform, secrets like passwords, API keys, or tokens should never be hardcoded directly into .tf files. Instead, we handle them using secure methods like environment variables, secret management tools, or encrypted files. Here's how I typically do it:"

    1. Use Environment Variables
        Pass secrets as environment variables like TF_VAR_db_password.
        Terraform picks up any env variable prefixed with TF_VAR_ automatically.

    2. Use a Secret Manager (Recommended)
    Fetch secrets from secure tools like:

        AWS Secrets Manager
        AWS SSM Parameter Store
        HashiCorp Vault
        Azure Key Vault, etc.

        eg of ssm 
        ```
        data "aws_ssm_parameter" "db_password" {
            name = "/prod/db/password"
            with_decryption = true
            }

            resource "aws_db_instance" "example" {
            ...
            password = data.aws_ssm_parameter.db_password.value
            }

        ```
        ```
        data "aws_secretsmanager_secret_version" "db" {
            secret_id = "prod/db/password"
            }

            resource "aws_db_instance" "example" {
            ...
            password = jsondecode(data.aws_secretsmanager_secret_version.db.secret_string)["password"]
            }
        ```
        ```        
        provider "vault" {
        address = "https://vault.mycompany.com"
        }

        data "vault_generic_secret" "db_creds" {
        path = "secret/data/prod/db"
        }

        resource "aws_db_instance" "example" {
        ...
        username = data.vault_generic_secret.db_creds.data["username"]
        password = data.vault_generic_secret.db_creds.data["password"]
        }
        ```




10. what is resource graphs in terraform ?
A.  In Terraform, a resource graph is a visual and internal representation of all the resources and their dependencies. Terraform builds this graph during the planning phase to determine the correct order in which resources should be created, updated, or destroyed."



11. what is terraform state locking
A.  
    "Terraform state locking is a mechanism that prevents multiple people or processes from making concurrent changes to the same state file. This ensures consistency and avoids state corruption during operations like apply or plan."

    Without state locking, two people running terraform apply at the same time could overwrite each other’s changes, leading to inconsistent infrastructure.
    Especially critical when using remote backends, where the state file is shared.

    What Happens During Locking:
        Terraform acquires a lock before modifying the state.
        If a lock exists, other operations will wait, fail, or prompt depending on the command.



12. what is a taineted resource in terraform
A.  
    "A tainted resource in Terraform is a resource that is marked for destruction and recreation on the next terraform apply, even if nothing in the configuration has changed. It's used when you suspect a resource is in a bad or inconsistent state and want to force a fresh one."

    when to use ;
        If a resource is corrupted or not working properly, but Terraform thinks it’s fine.
        If you need to manually trigger recreation without changing the .tf code.

        ``` terraform taint <resource_type.resource_name>```
        ``` terraform untaint <resource_type.resource_name>```

13. what is terraform state rollback  
A.
    "Terraform state rollback means restoring the Terraform state file to a previous known-good version, often after an unintended or failed change. While Terraform doesn’t have a built-in 'rollback' command, you can manually restore the state from a backup or versioned remote backend like S3."

    how tp perform rollback:
        If you’re using an S3 backend with versioning enabled, you can:\
        Go to the S3 bucket where your state file is stored.
        Find the previous version of the terraform.tfstate file.
        Download or copy it.
        Replace the current version with the previous one via the S3 console or CLI.

     Example Scenario:
        "In one project, someone accidentally tainted a production RDS instance. After the apply, it got replaced. We restored the state file from S3 to the previous version to sync things back after manually restoring the DB from backup."


    