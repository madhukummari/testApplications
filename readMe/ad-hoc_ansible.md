# 📌 Ansible Modules Cheat Sheet

## 🔹 1. Managing Packages

### ✅ Install a package
```sh
ansible all -m yum -a "name=httpd state=present"
ansible all -m apt -a "name=nginx state=present"
```

### ✅ Remove a package
```sh
ansible all -m yum -a "name=httpd state=absent"
```

### ✅ Update all packages
```sh
ansible all -m yum -a "name=* state=latest"
ansible all -m apt -a "update_cache=yes upgrade=dist"
```

---
## 🔹 2. Managing Services

### ✅ Start a service
```sh
ansible all -m service -a "name=httpd state=started"
```

### ✅ Stop a service
```sh
ansible all -m service -a "name=httpd state=stopped"
```

### ✅ Restart a service
```sh
ansible all -m service -a "name=httpd state=restarted"
```

### ✅ Enable a service at boot
```sh
ansible all -m service -a "name=httpd enabled=yes"
```

---
## 🔹 3. Managing Users and Groups

### ✅ Create a user
```sh
ansible all -m user -a "name=johndoe state=present"
```

### ✅ Delete a user
```sh
ansible all -m user -a "name=johndoe state=absent"
```

### ✅ Add user to a group
```sh
ansible all -m user -a "name=johndoe groups=developers append=yes"
```

---
## 🔹 4. Managing Files

### ✅ Create a file
```sh
ansible all -m file -a "path=/tmp/testfile state=touch"
```

### ✅ Delete a file
```sh
ansible all -m file -a "path=/tmp/testfile state=absent"
```

### ✅ Create a directory
```sh
ansible all -m file -a "path=/tmp/newdir state=directory mode=0755"
```

### ✅ Copy a file
```sh
ansible all -m copy -a "src=/etc/hosts dest=/tmp/hosts_backup mode=0644"
```

---
## 🔹 5. Managing File Permissions

### ✅ Change ownership
```sh
ansible all -m file -a "path=/tmp/testfile owner=johndoe group=developers"
```

### ✅ Change file mode
```sh
ansible all -m file -a "path=/tmp/testfile mode=0644"
```

---
## 🔹 6. Gathering Facts

### ✅ Gather all facts
```sh
ansible all -m setup
```

### ✅ Get specific fact (e.g., default IPv4)
```sh
ansible all -m setup -a 'filter=ansible_default_ipv4'
```

---
## 🔹 7. Running Commands

### ✅ Run a command (without shell features)
```sh
ansible all -m command -a "uptime"
```

### ✅ Run a shell command (allows pipes, redirection)
```sh
ansible all -m shell -a "echo $HOME"
```

---
## 🔹 8. Check Mode (Dry Run)

### ✅ Test without making changes
```sh
ansible all -m yum -a "name=httpd state=present" --check
```

---
## 🔹 9. Reboot a Server
```sh
ansible all -m reboot
```

---
## 🔹 10. Managing Cron Jobs

### ✅ Add a cron job
```sh
ansible all -m cron -a "name='cleanup' minute='0' hour='2' job='/usr/bin/rm -rf /tmp/*'"
```

### ✅ Remove a cron job
```sh
ansible all -m cron -a "name='cleanup' state=absent"
```

---
## 🔹 11. Managing Firewalls (UFW & IPTables)

### ✅ Allow SSH in UFW
```sh
ansible all -m ufw -a "rule=allow name=OpenSSH"
```

### ✅ Block port 80 in UFW
```sh
ansible all -m ufw -a "rule=deny port=80"
```

---
## 🔹 12. Downloading Files

### ✅ Download a file using `get_url`
```sh
ansible all -m get_url -a "url=https://example.com/file.tar.gz dest=/tmp/file.tar.gz"
```

---
## 🔹 13. Extracting Archives

### ✅ Extract a `.tar.gz` file
```sh
ansible all -m unarchive -a "src=/tmp/archive.tar.gz dest=/opt/ remote_src=yes"
```

---
## 🔹 14. Managing Docker Containers

### ✅ Start a Docker container
```sh
ansible all -m docker_container -a "name=mycontainer image=nginx state=started"
```

### ✅ Stop a Docker container
```sh
ansible all -m docker_container -a "name=mycontainer state=stopped"
```

---
## 🔹 15. Managing System Time & NTP

### ✅ Sync time with NTP
```sh
ansible all -m timezone -a "name=UTC"
```

---
## 🔹 16. Debugging & Logging

### ✅ Print a debug message
```sh
ansible all -m debug -a "msg='Hello, Ansible!'"
```
