docker platform is on single host
docker cannot provide auto healing
docker cannot auto scale
docker is not a type of enterprise standard(loadbalancing security advance network components)


architecture of kubenetes:
--------------------------------+-----------------------
| controll plane components     |  dataplane components  |
--------------------------------+------------------------
                                |
- api server                    |  - kubelet - (the component in nodes which is responsible for in functioning of PODS)
- etcd                          |  - kube proxy - (which is responsible for the communincation and default lB)   
- scheduler                     |  - container runtime (containerd, cri-o)
- controller manager
- cloud controll manager

master or control plan

- api server - the kubernetes must be exposed to outside in order to interact it is the heart of the kubernetes
- scheduler - it will work on scheduling the pods or the resources on the data plane scheduler act upon the instructions from the api-server
- etcd - which is data store of key value pair for the whole cluster we can say it as a cluster database
- controller manager -  for managing the state of controllers (replicasets stateful sets)

- ** cloud controller manager 
 1. - all cloud providers cannot write the code for seting up from scratch instead they can use CCM to doing some tweeks to the opensource code and impliment in the cloud to use cloud infra structure for kubernetes
 like aws created EKS
 azure   created AKS
 google created GKE

 example : in kuberners we'll have load balancers but aws provide the managed k8s cluster which internally create a alb as they costomised the k8s with ccm


 kube proxy: under the hood the service is created of any type it will update the ip tables to route the traffic to the specific pod

 kubelet : it ensures that containets are running and healthy and the resources they need are available 

 kubelet communicates with  kube api servers to get info about the containers  that should be running on the node and then start and stop the containers as needed to maintain desired state.


- kubernetes is a open source sofware which provide container orchestration service these opensource software  is further used and created distribitions of it 
 1. kubernetes
 2. openshift redhat
 3. rancher
 4. tanzu
 5. eks
 6. aks
 7. dke
 8. gke

 popular distribution is kubernetes
 1. as part of devops engineer role we manage k8s cluster on our organisation 
 2. we ensure that we the application are deployed on the cluster
 3. we have set up the monitoring services on the k8s cluster so that we come to know the bugs in the cluster
 4. if the developers are facing the issue with clusters and facing issue with the clusters we as k8s smes comes in to pictures as user raise a jira or service now tickts well get into trouble shooting call with users and clean the path for them

 what are the day 2 day k8s






 how devops engineer manages 100's of nodes on the kubernetes

 widely used tools for managing kubernetes 

 1. KOPS {latest}
 2. KUBEADM {2-3 years back mostly} - have to do a lot of manual activities while upgrading

 ## KOPS : 
 kubenetes operations -kopS
  - installation           |
  - upgradition            |   these are called the lifecycle of kubernetes which is managed buy KOPS
  - modifications          |
  - deletion of clustes    |



## difference between docker containers and kubernetes pods

- docker running the contaier we specify the configuration at the cli level where as in pod we write configuration of pod in yaml

### pods is a group of container or container
pod is a wrapper for a container

## Kubectl
- command line tool for the kubernetes

- kubectl apply -f pod.yaml
- kubectl get pods -o wide
- minikube ssh
- kubectl delete pod nginx

## interview - how do you troubleshoot a pod 

kubectl describe pod podname
kubectl logs podname


```
#!/bin/bash

sudo apt-get update

sudo apt install -y docker.io

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb

sudo usermod -aG docker $USER && newgrp docker
minikube start

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

```

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
## difference between container pod and deployment

- container:
    -  it a basic tool to to contain docker image
    -  we specify the contaier specifications using cli with command docker run it -- port -v volume - network networkname
    - it is a declarative it will create as we instructed -one container contain one image

- pod :
    - it is like a wrapper on the container
    - it can contain one or more containers
    - dependancy container can communicate on the same network
    - but connot have the capabilities of auto scaling and auto healing of its own

- deployment:
    - at the ground level it eventually create pods but maintain the state of the manifest using  controller managers like RS- replica sets etc.
    useful for maintaining the autoscaling and auto healing


========================================================================

## deployment - in detail

> commands:
    - kubectl get deploy                                   { get the list of deployments }
    - kubectl delete deploy deploy-name                    {to delete the specific deployments}
    - kubectl get rs                                       { to ge the list of replicasets }
    - kubectl get all                                      { instead of getting all the list of deployments pods etc one by one in a current name space}
    - kubectl get all -A                                   { get all lists from all name spaces}

    - kubectl get pods -w                                  {on the live it would show whats happening to the pod}

    - kubectl apply -f  deployment.yaml                     { to capply the new changes to existing deployment or new deployment}


we write the deploymet.yaml 
- deployment ensure the state let say 3 replicas 4 replicas  as mentioned in the deployment file 
- deployment is just a abstraction, the core work is taken care by RS-Replicaset (controller) at the backend
- deployment --> replicaset---> creation or deletion of pods

## services in Detail:

- problem is alone deployment cannot ensure auto healing and auto scaling as the ip addressess of the pods constantly changes when the pod is destroyed it gets end users difficult in accessing the application

- so we need a solution to route traffic to the application containing pods with out ip addrss 
- this load balancing activity is taken care by service with the help of kubeProxy
- it identifies the the pods with lables and selctors which will be specified when manifesting a deployment
-   svc handles:
        - load balancing 
        - service discovery { with lables and selectors}
        - exposing to the world
        
kubernetes service types: 

1. cluster ip (default) only communicatio with-in the cluster
2. node port -  can connect to the nodes with in the organisation with the specifying node port
3. load balancer- if connection to be establised from out side world


## Load balancer vs ingress controller
🎯 When to Use What?
✅ Use LoadBalancer if:

You have a single service that needs external access.
You are exposing non-HTTP services (e.g., databases, gRPC, TCP/UDP applications).
You need cloud-native solutions like AWS NLB/ALB.

✅ Use Ingress if:
You need path-based routing (e.g., /api → backend, /shop → frontend).
You want one LoadBalancer instead of multiple (cost-saving).
You need centralized SSL management.
You are hosting multiple microservices under a single domain.

🚀 Summary
LoadBalancer Service exposes a single service to the internet.
Ingress Controller provides intelligent routing for multiple services using one LoadBalancer.
For AWS: Use ALB Ingress Controller for a cloud-native solution.
For Multi-Cloud or On-Prem: Use Nginx Ingress Controller with an NLB.

## what is ingress in kubernetes:

ingress exposes http and https requests from the out side world to inside service based on the routing policies lies like /path based routing 

with single ingress we can route traffic top different services in the cluster

## what is ingress controller:

you cannot work with ingress alone you need to created a ingress controller 
there are many ingress controller like nginx, F5, alb


## core components of ingress

1. ### Ingress resources ( Routing rules )
 - its a kubernetes api object
 - which defines desired routing behavior for the cluster
    - hostname based eg : madhu.social.com, social.com, app.social.com
    - path based  eg : /api , /login, /home etc
    - are declarative and are managed using yaml manifest files

2. ### Ingress controll
    - is the actual components that read the rules in the ingress resource yaml files and implement
    - keep watch of ingress resources and dynamically configure the load balancing
    - popular ingress controllers
        - nginx
        - traefik
        - HAProxy
        - AWS ALB ingress controller

    - need to implememt it in cluster separately not built in by default

3. ### SSL 

    

    passing http request to the services is non secure do to make it secure we have
    - ingress controllers handles traffic 
    -  ssl termination etc  is handled by IC
    - cert-manger is used to store, automate provision and renewal 

    #### TLS ssl passthrough:
    passes https trafic directly to backend services without decrypting the traffic at loadbalancer
     - load balancer capabilities are merely used.
     - attackers can pass hacking code in the trafic codes and will directly passed to the backend server
     - ssl passthrough is also a costly process. might require more cpu(decryption is taken care by service we can see latency)

    #### TLS SSL Offloading / termination:

    dycrypts all the https trafics when arrives and data is sent to destination server as a plain http trafic

    - not secure as middle man attacks 
    - faster

    #### SSL Bridging:

    it decrypts all the https requests when arrved at loadbalancer and data is sent to destination server as a https traffic by reencrypting

    - most secure way 
    - more costly


    * ### load balancing and ingress
     - 1. load balancer will not provide enterprise and tls loadbalancing features
            - stikyness
            - tls
            - pathbased
            - hostbased
    - 2. loadbalancer need to created for each service let say if we have 100 services we needed 100 which in fact cost us a lot from cloudprovider


    ## RBAC

    managing based on roles
    1. managing access for user 
    2. managinng access for Services


    1. service accounts or users
    2. roles / cluster role
    3. role binding custom rolebinding

## Kubernetes custom resources:

- kubernetes allows to extend the default api capabilitoes for allowing users to drfine their own  resource types
- These resources enable Kubernetes to manage custom application-specific configurations just like built-in objects such as Pods, Services, and Deployments.

to extend the capabilities of kubernetes we have 3 types

 - custom resource definiiton
 - custom resurce
 - custom controller

 like kubenrentes has bultin resources like deploymnet
 kubernetes by default had resource definition for deployment this is blueprint  that  how a deployment will be

 the same way if you wanted to setup a custom resources you will create a custom resource definition for that resource and then a custom resource is created on that










