# clovertex interview questions

> panel : narendra

### interview questions

1. Python patten question
2. What is the difference b/w list and a tuple ? write a programm to declare a python list and and reverse the elements in the list in slicing method and normal method
3. Write a boto3 script for listing out buckets and objects
4. I have an ec2 instance and i have configured the user and and the password is coming from password manager PMP which will auto rotate for evry monthn there are few users who are using this user to login in to the server but i cant share the password i should set up time the user to allow login with out asking for password what should i do

> Answer : use password less authentication
- create ssh keys for each users in their local systems
    ```ssh-copy-id -i ~/.ssh/my_key <username>@<EC2-IP>```

- Private Key (my_key) → Kept secure on the user's machine.
  Public Key (my_key.pub) → Will be added to the EC2 instance.

- Each user copies their public key (my_key.pub) to the EC2 instance: 
``` ssh-copy-id -i ~/.ssh/my_key <username>@<EC2-IP>``` or
``` cat ~/.ssh/my_key.pub | ssh <username>@<EC2-IP> "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"```
- Ensure the correct permissions for SSH to work:
```chmod 700 ~/.ssh```
```chmod 600 ~/.ssh/authorized_keys```

- To enforce only SSH key-based authentication, edit the SSH configuration file:
```sudo nano /etc/ssh/sshd_config```
- Update the following lines:

```PasswordAuthentication no```:
```ChallengeResponseAuthentication no```

- Restart SSH to apply changes:


```sudo systemctl restart sshd```

- user can login with :
``` ssh -i ~/.ssh/my_key <username>@<EC2-IP> ```

5. difference b/w nacl and security group
6. achieve high availbilty in deploying a web application
7. cicd proces with pipeline with git code repository and code deploy
8. Jenkins multibranch pipelines
9. kubernetes architecture
10. HPA pods shoud 3 but 4 created when it is first created EVEN  THE CPU IS IN EXPECTED METRIC
### Why are 4 Pods Created Initially When HPA is Set to 3?

When using Horizontal Pod Autoscaler (HPA) in Kubernetes, you might observe that the number of pods created initially exceeds the desired count, even when the CPU or other metrics are within the expected range. Here are some possible reasons and explanations:

#### 1. **Initial Burst of Pods**
  - HPA may create additional pods during the initial scaling process to ensure that the application can handle potential traffic spikes or load.
  - This behavior can occur if the HPA controller anticipates higher resource usage based on historical data or initial metrics.

#### 2. **Metrics Collection Delay**
  - HPA relies on metrics from the Kubernetes Metrics Server or custom metrics providers.
  - If there is a delay in collecting or processing metrics, HPA might temporarily over-provision pods to avoid under-scaling.

#### 3. **Default Behavior of Deployment Controller**
  - The Deployment controller might create extra pods during the rollout process to ensure availability.
  - For example, if the `maxSurge` parameter in the Deployment strategy is set to a value greater than 0, additional pods may be created temporarily.

  ```yaml
  strategy:
    type: RollingUpdate
    rollingUpdate:
     maxSurge: 1
     maxUnavailable: 0
  ```

#### 4. **Custom Metrics or Incorrect Thresholds**
  - If custom metrics are used, incorrect thresholds or misconfigured metrics might cause HPA to scale up unnecessarily.
  - Verify the HPA configuration and ensure that the target metrics and thresholds are accurate.

#### 5. **Cluster Autoscaler Interaction**
  - If the cluster autoscaler is enabled, it might provision additional nodes and pods to meet the perceived resource requirements.

#### How to Address This Issue:
1. **Verify HPA Configuration**:
  - Check the HPA configuration to ensure that the `minReplicas` and `maxReplicas` values are set correctly.
  - Example:
    ```yaml
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
     name: my-app-hpa
    spec:
     scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: my-app
     minReplicas: 3
     maxReplicas: 10
     metrics:
     - type: Resource
      resource:
        name: cpu
        target:
         type: Utilization
         averageUtilization: 70
    ```

2. **Monitor Metrics**:
  - Use tools like Prometheus and Grafana to monitor CPU, memory, and custom metrics.
  - Ensure that the metrics server is functioning correctly and providing accurate data.

3. **Adjust Deployment Strategy**:
  - Modify the `maxSurge` and `maxUnavailable` parameters in the Deployment strategy to control the number of additional pods during rollouts.

4. **Test and Observe**:
  - Deploy the application in a test environment and observe the scaling behavior.
  - Fine-tune the HPA and Deployment configurations based on the observed behavior.

By understanding and addressing these factors, you can ensure that the HPA behaves as expected and maintains the desired number of pods. 
11. how do you backup jenkins

12. If the logs on the Jenkins console are stopped, where can you check alternatively?

  - **Jenkins Log Files**:
    - Check the Jenkins master log files located at `/var/log/jenkins/jenkins.log` (default location for Linux systems).
    - For Windows, check the log files in the Jenkins installation directory.

  - **Build-Specific Logs**:
    - Navigate to the Jenkins workspace directory for the specific job and check the `build` logs.
    - Example: `/var/lib/jenkins/jobs/<job-name>/builds/<build-number>/log`.

  - **System Logs**:
    - Check the system logs for any errors related to Jenkins or the underlying system.
    - Example: `/var/log/syslog` or `/var/log/messages` on Linux.

  - **Pipeline Logs**:
    - If using a pipeline, check the logs for individual stages in the pipeline script.

  - **External Logging Tools**:
    - If integrated with external logging tools like ELK Stack, Splunk, or CloudWatch, check those dashboards for Jenkins logs.

  - **Browser Console**:
    - Check the browser developer tools console for any errors if the Jenkins UI is unresponsive.

  - **Jenkins Agent Logs**:
    - If using Jenkins agents, check the agent logs for connectivity or execution issues.




