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
10.  HPA pods shoud 3 but 4 created why
ss




