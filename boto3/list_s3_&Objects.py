import boto3

# Initialize S3 client
s3_client = boto3.client('s3')

# List all buckets
response = s3_client.list_buckets()

# Iterate over each bucket
for bucket in response['Buckets']:
    bucket_name = bucket['Name']
    print(f"Bucket: {bucket_name}")

    # List objects in the bucket
    objects_response = s3_client.list_objects_v2(Bucket=bucket_name)

    # Check if bucket has objects
    if 'Contents' in objects_response:
        for obj in objects_response['Contents']:
            print(f"  - {obj['Key']}")
    else:
        print("  - No objects found in this bucket.")
