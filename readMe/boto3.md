# **Boto3 Master Guide for AWS Automation**

## **Table of Contents**
1. [Introduction to Boto3](#introduction-to-boto3)
2. [Installation & Configuration](#installation--configuration)
3. [Boto3 Client vs Resource](#boto3-client-vs-resource)
4. [Common AWS Services & Methods](#common-aws-services--methods)
5. [Important Boto3 Scripts](#important-boto3-scripts)
   - EC2 Management
   - S3 Bucket Management
   - IAM User Management
   - RDS Snapshot Handling
   - DynamoDB CRUD Operations

---

## **Introduction to Boto3**
Boto3 is the **official AWS SDK for Python**. It allows you to interact with AWS services programmatically for automation and infrastructure management.

### **Why Use Boto3?**
- Automate AWS infrastructure
- Manage EC2, S3, RDS, IAM, Lambda, and more
- Reduce manual AWS Console work
- Integrate AWS with Python applications

---

## **Installation & Configuration**

### **Installing Boto3**
```sh
pip install boto3
```

### **Setting Up AWS Credentials**
#### **Method 1: Configure via AWS CLI**
```sh
aws configure
```
Stores credentials in `~/.aws/credentials`

#### **Method 2: Use Environment Variables**
```sh
export AWS_ACCESS_KEY_ID='your_access_key'
export AWS_SECRET_ACCESS_KEY='your_secret_key'
export AWS_REGION='us-east-1'
```

#### **Method 3: Use `boto3.Session()`**
```python
import boto3
session = boto3.Session(
    aws_access_key_id='your_access_key',
    aws_secret_access_key='your_secret_key',
    region_name='us-east-1'
)
```

---

## **Boto3 Client vs Resource**
### **Client (`boto3.client()`) - Low-Level API**
- Direct AWS API calls
- Returns JSON responses
- Example: `ec2_client.describe_instances()`

```python
import boto3
client = boto3.client('ec2')
response = client.describe_instances()
print(response['Reservations'])
```

### **Resource (`boto3.resource()`) - High-Level API**
- Object-oriented API
- Uses Python objects for AWS resources
- Example: `ec2_resource.instances.all()`

```python
import boto3
resource = boto3.resource('ec2')
for instance in resource.instances.all():
    print(instance.id, instance.state['Name'])
```

---

## **Common AWS Services & Methods**

### **EC2 Management**
| Method | Description |
|--------|-------------|
| `describe_instances()` | Get details of all EC2 instances |
| `start_instances(InstanceIds=[id])` | Start an EC2 instance |
| `stop_instances(InstanceIds=[id])` | Stop an EC2 instance |
| `terminate_instances(InstanceIds=[id])` | Terminate an EC2 instance |

### **S3 Bucket Operations**
| Method | Description |
|--------|-------------|
| `list_buckets()` | List all S3 buckets |
| `create_bucket(Bucket='name')` | Create an S3 bucket |
| `delete_bucket(Bucket='name')` | Delete an S3 bucket |
| `upload_file('file', 'bucket', 'key')` | Upload a file to S3 |

### **IAM User Management**
| Method | Description |
|--------|-------------|
| `create_user(UserName='name')` | Create an IAM user |
| `list_users()` | List all IAM users |
| `delete_user(UserName='name')` | Delete an IAM user |

### **DynamoDB Operations**
| Method | Description |
|--------|-------------|
| `create_table()` | Create a DynamoDB table |
| `put_item()` | Insert an item into DynamoDB |
| `get_item()` | Retrieve an item |
| `delete_item()` | Delete an item |

---

## **Important Boto3 Scripts**

### **1️⃣ Start and Stop an EC2 Instance**
```python
import boto3
ec2 = boto3.client('ec2')
ec2.start_instances(InstanceIds=['i-xxxxxxxxxxxxxxxxx'])
ec2.stop_instances(InstanceIds=['i-xxxxxxxxxxxxxxxxx'])
```

### **2️⃣ List All S3 Buckets**
```python
import boto3
s3 = boto3.client('s3')
response = s3.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])
```

### **3️⃣ Upload File to S3**
```python
s3 = boto3.client('s3')
s3.upload_file('localfile.txt', 'my-bucket', 's3file.txt')
```

### **4️⃣ List IAM Users**
```python
import boto3
iam = boto3.client('iam')
response = iam.list_users()
for user in response['Users']:
    print(user['UserName'])
```

### **5️⃣ Create a DynamoDB Table**
```python
import boto3
dynamodb = boto3.client('dynamodb')
response = dynamodb.create_table(
    TableName='Users',
    KeySchema=[
        {'AttributeName': 'UserID', 'KeyType': 'HASH'}
    ],
    AttributeDefinitions=[
        {'AttributeName': 'UserID', 'AttributeType': 'S'}
    ],
    ProvisionedThroughput={'ReadCapacityUnits': 1, 'WriteCapacityUnits': 1}
)
print('Table Created:', response['TableDescription']['TableName'])
```

### **6️⃣ Delete Old Snapshots (EC2 Backups)**
```python
import boto3
client = boto3.client('ec2')
snapshots = client.describe_snapshots(OwnerIds=['self'])
for snapshot in snapshots['Snapshots']:
    if snapshot['StartTime'].year < 2023:
        client.delete_snapshot(SnapshotId=snapshot['SnapshotId'])
        print(f"Deleted snapshot {snapshot['SnapshotId']}")
```

### **7️⃣ List All RDS Instances**
```python
import boto3
rds = boto3.client('rds')
response = rds.describe_db_instances()
for db in response['DBInstances']:
    print(db['DBInstanceIdentifier'], db['DBInstanceStatus'])
```

---

## **Modify Scripts for Real-World AWS Tasks**
### **1️⃣ EC2 Auto-Stop for Non-Production Instances**
```python
import boto3

ec2 = boto3.client('ec2')
response = ec2.describe_instances(Filters=[{'Name': 'tag:Environment', 'Values': ['NonProd']}])

for reservation in response['Reservations']:
    for instance in reservation['Instances']:
        instance_id = instance['InstanceId']
        print(f"Stopping instance {instance_id}")
        ec2.stop_instances(InstanceIds=[instance_id])
```

### **2️⃣ Delete Old EC2 Snapshots (Free Up Storage)**
```python
import boto3
from datetime import datetime, timedelta

ec2 = boto3.client('ec2')
delete_before = datetime.utcnow() - timedelta(days=7)

snapshots = ec2.describe_snapshots(OwnerIds=['self'])['Snapshots']
for snapshot in snapshots:
    snapshot_time = snapshot['StartTime'].replace(tzinfo=None)
    if snapshot_time < delete_before:
        print(f"Deleting snapshot {snapshot['SnapshotId']} from {snapshot_time}")
        ec2.delete_snapshot(SnapshotId=snapshot['SnapshotId'])
```

---

## **Integrate with DevOps Tools**

### **Terraform + Boto3**
#### **Generate Terraform Variables from AWS**
```python
import boto3
import json

ec2 = boto3.client("ec2")
images = ec2.describe_images(Owners=["amazon"], Filters=[{"Name": "name", "Values": ["amzn2-ami-hvm-*-x86_64-gp2"]}])
ami_id = sorted(images["Images"], key=lambda x: x["CreationDate"], reverse=True)[0]["ImageId"]

vpcs = ec2.describe_vpcs()["Vpcs"]
vpc_id = vpcs[0]["VpcId"]

subnets = ec2.describe_subnets()["Subnets"]
subnet_id = subnets[0]["SubnetId"]

with open("terraform.tfvars.json", "w") as file:
    json.dump({"ami_id": ami_id, "vpc_id": vpc_id, "subnet_id": subnet_id}, file, indent=4)
```

### **Ansible + Boto3**
#### **Generate Dynamic Ansible Inventory from EC2**
```python
import boto3

ec2 = boto3.client("ec2")
instances = ec2.describe_instances(Filters=[{"Name": "instance-state-name", "Values": ["running"]}])

with open("inventory.ini", "w") as file:
    file.write("[aws_servers]\n")
    for reservation in instances["Reservations"]:
        for instance in reservation["Instances"]:
            ip = instance["PublicIpAddress"]
            name = next((tag["Value"] for tag in instance.get("Tags", []) if tag["Key"] == "Name"), "Unknown")
            file.write(f"{ip} ansible_host={ip} ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/aws.pem  # {name}\n")
```

### **Jenkins + Boto3**
#### **Deploy EC2 Instance from Jenkins Pipeline**
```python
import boto3

ec2 = boto3.resource("ec2")
instance = ec2.create_instances(
    ImageId="ami-0abcdef1234567890",
    InstanceType="t2.micro",
    MinCount=1,
    MaxCount=1,
    KeyName="jenkins-key",
    SecurityGroups=["jenkins-security-group"]
)[0]

print(f"EC2 instance {instance.id} created successfully!")
```

---

## **Conclusion**
- **Boto3** is the best way to automate AWS with Python.
- Use **clients for API-level control**, and **resources for object-based interactions**.
- Master **EC2, S3, IAM, RDS, and DynamoDB automation**.

🚀 **Next Steps:** Practice these scripts, explore more AWS services, and integrate with DevOps workflows!
