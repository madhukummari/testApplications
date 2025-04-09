provider "aws" {
  region = "us-east-1"
}


resource "aws_instance" "minikube" {

    instance_type =  "t2.medium"
    key_name      = "keypair2025"
    ami           = "ami-084568db4383264d4"
    # security_groups = [ "sg-091f802f773881889" ]
}