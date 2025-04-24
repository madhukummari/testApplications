# Ansible Interview Questions and Answers for 4 Years Experience

## General Questions

### 1. What is Ansible, and how does it work?
**Answer**:  
Ansible is an open-source automation tool used for configuration management, application deployment, and task automation. It works by connecting to nodes via SSH and pushing small programs called "modules" to perform tasks.

---

### 2. What are the key components of Ansible?
**Answer**:  
- **Inventory**: List of managed nodes.
- **Playbooks**: YAML files containing tasks.
- **Modules**: Predefined scripts for tasks.
- **Plugins**: Extend Ansible functionality.
- **Facts**: System information gathered by Ansible.

---

### 3. How is Ansible different from other configuration management tools like Puppet or Chef?
**Answer**:  
- Agentless: No need to install agents on nodes.
- Simple YAML syntax.
- Uses SSH for communication.
- Easier to set up and use.

---

## Scenario-Based Questions

### 4. Write a playbook to install Apache on a server.
**Answer**:  
```yaml
- name: Install Apache
    hosts: webservers
    become: yes
    tasks:
        - name: Install Apache package
            apt:
                name: apache2
                state: present
```

---

### 5. How do you test if a server is reachable using Ansible?
**Command**:  
```bash
ansible all -m ping
```

---

### 6. How do you copy a file to multiple servers using Ansible?
**Answer**:  
```yaml
- name: Copy file to servers
    hosts: all
    tasks:
        - name: Copy file
            copy:
                src: /path/to/source/file
                dest: /path/to/destination/file
```

---

### 7. How do you use Ansible Vault to encrypt sensitive data?
**Command**:  
```bash
ansible-vault encrypt secrets.yml
```

**Usage in Playbook**:  
```yaml
vars_files:
    - secrets.yml
```

---

### 8. Write a playbook to restart a service if a configuration file changes.
**Answer**:  
```yaml
- name: Restart service on config change
    hosts: all
    tasks:
        - name: Copy configuration file
            copy:
                src: /path/to/config
                dest: /etc/service/config
                notify: Restart service

    handlers:
        - name: Restart service
            service:
                name: myservice
                state: restarted
```

---

### 9. How do you gather facts about a server?
**Command**:  
```bash
ansible all -m setup
```

---

### 10. Write a playbook to create a user and set a password.
**Answer**:  
```yaml
- name: Create user
    hosts: all
    tasks:
        - name: Add user
            user:
                name: myuser
                password: "{{ 'mypassword' | password_hash('sha512') }}"
```

---

## Advanced Questions

### 11. How do you handle dynamic inventory in Ansible?
**Answer**:  
Use a script or plugin to generate inventory dynamically. Example: AWS EC2 dynamic inventory plugin.

---

### 12. How do you debug a playbook?
**Command**:  
```bash
ansible-playbook playbook.yml --step
```

---

### 13. How do you run a specific task in a playbook?
**Command**:  
```bash
ansible-playbook playbook.yml --start-at-task="Task Name"
```

---

### 14. How do you use tags in Ansible?
**Answer**:  
```yaml
- name: Example playbook with tags
    hosts: all
    tasks:
        - name: Install package
            apt:
                name: nginx
                state: present
            tags: install
```

Run with tags:  
```bash
ansible-playbook playbook.yml --tags install
```

---

### 15. How do you handle errors in Ansible?
**Answer**:  
Use `ignore_errors: yes` or `failed_when` conditions.

---

### 16. Write a playbook to deploy a web application.
**Answer**:  
```yaml
- name: Deploy web application
    hosts: webservers
    tasks:
        - name: Copy application files
            copy:
                src: /path/to/app
                dest: /var/www/html
        - name: Restart web server
            service:
                name: apache2
                state: restarted
```

---

### 17. How do you use loops in Ansible?
**Answer**:  
```yaml
- name: Install multiple packages
    apt:
        name: "{{ item }}"
        state: present
    loop:
        - nginx
        - git
        - curl
```

---

### 18. How do you use conditionals in Ansible?
**Answer**:  
```yaml
- name: Install package if condition is met
    apt:
        name: nginx
        state: present
    when: ansible_os_family == "Debian"
```

---

### 19. How do you manage roles in Ansible?
**Answer**:  
Use `ansible-galaxy` to create and manage roles. Example:  
```bash
ansible-galaxy init myrole
```

---

### 20. How do you execute an ad-hoc command in Ansible?
**Command**:  
```bash
ansible all -m shell -a "uptime"
```

---
### 21. How do you use Ansible to manage Docker containers?
**Answer**:  
Use the `community.docker` collection to manage Docker containers. Example playbook:  
```yaml
- name: Manage Docker containers
    hosts: all
    tasks:
        - name: Start a Docker container
            community.docker.docker_container:
                name: my_container
                image: nginx
                state: started
```

---

### 22. How do you handle secrets in Ansible without exposing them in playbooks?
**Answer**:  
Use Ansible Vault to encrypt sensitive data and include it in playbooks. Example:  
```bash
ansible-vault encrypt_string 'my_secret_password' --name 'db_password'
```

In playbook:  
```yaml
vars:
    db_password: !vault |
        $ANSIBLE_VAULT;1.1;AES256...
```

---

### 23. How do you ensure idempotency in Ansible tasks?
**Answer**:  
Ansible modules are designed to be idempotent by default. Ensure tasks do not make changes if the desired state is already achieved.

---

### 24. How do you use Ansible with CI/CD pipelines?
**Answer**:  
Integrate Ansible with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions by running playbooks as part of the pipeline scripts.

---

### 25. How do you manage multiple environments (e.g., dev, staging, prod) in Ansible?
**Answer**:  
Use separate inventory files or group variables for each environment. Example:  
```bash
inventory/
    dev/
        hosts
        group_vars/
    staging/
        hosts
        group_vars/
    prod/
        hosts
        group_vars/
```

---

### 26. How do you use Ansible to manage Kubernetes clusters?
**Answer**:  
Use the `community.kubernetes` collection to manage Kubernetes resources. Example:  
```yaml
- name: Deploy to Kubernetes
    hosts: localhost
    tasks:
        - name: Apply Kubernetes manifest
            community.kubernetes.k8s:
                state: present
                definition: "{{ lookup('file', 'deployment.yml') }}"
```

---

### 27. How do you optimize Ansible playbooks for performance?
**Answer**:  
- Use `async` and `poll` for long-running tasks.
- Limit tasks to specific hosts using `--limit`.
- Use `gather_facts: no` if facts are not needed.
- Use `delegate_to` for tasks that can run on a control node.

---

### 28. How do you handle dependencies between roles in Ansible?
**Answer**:  
Define role dependencies in the `meta/main.yml` file of a role. Example:  
```yaml
dependencies:
  - role: common
  - role: webserver
```

---

### 29. How do you use Ansible to manage cloud resources?
**Answer**:  
Use cloud-specific modules or collections like `amazon.aws`, `google.cloud`, or `azure.azcollection`. Example for AWS:  
```yaml
- name: Create an EC2 instance
    hosts: localhost
    tasks:
        - name: Launch EC2 instance
            amazon.aws.ec2_instance:
                name: my_instance
                instance_type: t2.micro
                image_id: ami-12345678
                region: us-east-1
```

---

### 30. How do you troubleshoot Ansible playbook failures?
**Answer**:  
- Use `-vvv` for verbose output.
- Check logs and error messages.
- Use `ansible-playbook --check` for dry runs.
- Debug with the `debug` module:  
```yaml
- name: Debug variable
    debug:
        var: my_variable
```

---
### 31. What are the advantages of using Ansible?
**Answer**:  
- Agentless architecture.
- Simple and human-readable YAML syntax.
- Wide range of modules for various tasks.
- Idempotent operations ensure consistent results.
- Extensible with plugins and custom modules.

---

### 32. What is the difference between a playbook and a role in Ansible?
**Answer**:  
- **Playbook**: A YAML file containing tasks to be executed on managed nodes.
- **Role**: A structured way to organize playbooks, tasks, variables, templates, and files for reuse.

---

### 33. What is the purpose of the `ansible.cfg` file?
**Answer**:  
The `ansible.cfg` file is the configuration file for Ansible. It allows customization of settings such as inventory location, SSH settings, and plugin paths.

---

### 34. What are Ansible facts, and how are they used?
**Answer**:  
Ansible facts are system properties collected by the `setup` module. They provide information about managed nodes, such as OS, IP address, and hardware details, and can be used in playbooks for conditional tasks.

---

### 35. What is the difference between `vars`, `vars_files`, and `vars_prompt` in Ansible?
**Answer**:  
- **`vars`**: Define variables directly in the playbook.
- **`vars_files`**: Include variables from external files.
- **`vars_prompt`**: Prompt the user for variable values during playbook execution.

---

### 36. What is the purpose of the `become` directive in Ansible?
**Answer**:  
The `become` directive allows privilege escalation (e.g., running tasks as `root` or another user) during playbook execution.

---

### 37. What is the difference between `command` and `shell` modules in Ansible?
**Answer**:  
- **`command`**: Executes commands without invoking a shell. Does not support shell features like pipes or redirection.
- **`shell`**: Executes commands through a shell, allowing the use of shell features.

---

### 38. What is the purpose of the `handlers` section in Ansible?
**Answer**:  
Handlers are tasks triggered by the `notify` directive. They are executed only when notified and are typically used for actions like restarting services after configuration changes.

---

### 39. What is the difference between `include` and `import` in Ansible?
**Answer**:  
- **`include`**: Dynamically includes tasks or files at runtime.
- **`import`**: Statically includes tasks or files at the time of playbook parsing.

---

### 40. What is the purpose of the `gather_facts` directive in Ansible?
**Answer**:  
The `gather_facts` directive enables or disables the collection of facts about managed nodes before executing tasks. It is enabled by default.

### 41. How do you use Ansible to manage Windows servers?
**Answer**:  
Ansible can manage Windows servers using the `winrm` protocol. Example playbook:  
```yaml
- name: Manage Windows server
    hosts: windows
    tasks:
        - name: Install IIS
            win_feature:
                name: Web-Server
                state: present
```

---

### 42. How do you use Ansible to schedule tasks?
**Answer**:  
Use the `cron` module to schedule tasks. Example:  
```yaml
- name: Schedule a cron job
    hosts: all
    tasks:
        - name: Add a cron job
            cron:
                name: "Backup job"
                minute: "0"
                hour: "2"
                job: "/usr/bin/backup.sh"
```

---

### 43. How do you use Ansible to manage network devices?
**Answer**:  
Use network-specific modules or collections like `cisco.ios` or `arista.eos`. Example:  
```yaml
- name: Configure a Cisco device
    hosts: switches
    tasks:
        - name: Configure hostname
            cisco.ios.ios_config:
                lines:
                    - hostname MySwitch
```

---

### 44. How do you use Ansible to manage databases?
**Answer**:  
Use database-specific modules like `community.mysql.mysql_db` or `postgresql_db`. Example:  
```yaml
- name: Create a MySQL database
    hosts: dbservers
    tasks:
        - name: Create database
            community.mysql.mysql_db:
                name: my_database
                state: present
```

---

### 45. How do you use Ansible to manage files and directories?
**Answer**:  
Use the `file` module. Example:  
```yaml
- name: Create a directory
    hosts: all
    tasks:
        - name: Ensure directory exists
            file:
                path: /path/to/directory
                state: directory
```

---

### 46. How do you use Ansible to manage services?
**Answer**:  
Use the `service` module. Example:  
```yaml
- name: Manage services
    hosts: all
    tasks:
        - name: Ensure nginx is running
            service:
                name: nginx
                state: started
```

---

### 47. How do you use Ansible to manage users and groups?
**Answer**:  
Use the `user` and `group` modules. Example:  
```yaml
- name: Manage users and groups
    hosts: all
    tasks:
        - name: Create a group
            group:
                name: developers
        - name: Create a user
            user:
                name: devuser
                groups: developers
```

---

### 48. How do you use Ansible to manage packages?
**Answer**:  
Use package manager modules like `apt`, `yum`, or `dnf`. Example:  
```yaml
- name: Install a package
    hosts: all
    tasks:
        - name: Install nginx
            apt:
                name: nginx
                state: present
```

---

### 49. How do you use Ansible to manage templates?
**Answer**:  
Use the `template` module to deploy Jinja2 templates. Example:  
```yaml
- name: Deploy a template
    hosts: all
    tasks:
        - name: Deploy configuration file
            template:
                src: /path/to/template.j2
                dest: /etc/config.conf
```

---

### 50. How do you use Ansible to manage system reboots?
**Answer**:  
Use the `reboot` module. Example:  
```yaml
- name: Reboot servers
    hosts: all
    tasks:
        - name: Reboot the server
            reboot:
                reboot_timeout: 300
```