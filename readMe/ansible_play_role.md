# Ansible Playbooks, Roles & Error Handling - Detailed Notes

## 📌 Ansible Playbooks

### **🔹 What is an Ansible Playbook?**
An **Ansible Playbook** is a YAML file that defines a set of automation tasks for configuring systems, deploying applications, and managing services.

### **🔹 Playbook Structure**
A basic Ansible Playbook consists of:
```yaml
- name: Example Playbook
  hosts: web_servers
  become: yes
  tasks:
    - name: Install Nginx
      ansible.builtin.apt:
        name: nginx
        state: present
```

### **🔹 Components of a Playbook**
| **Component** | **Description** |
|--------------|----------------|
| `name` | Descriptive name of the playbook |
| `hosts` | Specifies target hosts from inventory |
| `become` | Grants sudo/root privileges |
| `tasks` | Defines the tasks to be executed |
| `vars` | Stores variables used in the playbook |
| `handlers` | Defines tasks that trigger when notified |

### **🔹 Example: Multi-Task Playbook**
```yaml
- name: Setup Web Server
  hosts: web_servers
  become: yes
  vars:
    package_name: nginx
  tasks:
    - name: Install Web Server
      ansible.builtin.apt:
        name: "{{ package_name }}"
        state: present

    - name: Ensure Web Server is Running
      ansible.builtin.systemd:
        name: nginx
        state: started
        enabled: yes
```
✅ **Use Case:** Automatically installs and starts Nginx on all web servers.

---

## 📌 Ansible Roles

### **🔹 What are Ansible Roles?**
Ansible **roles** help organize automation into **modular, reusable components** by grouping related tasks, variables, files, and handlers.

### **🔹 Ansible Role Directory Structure**
When you create a role using `ansible-galaxy init my_role`, it generates:
```
my_role/
├── defaults/         # Low-priority default variables
│   ├── main.yml
├── vars/             # High-priority variables
│   ├── main.yml
├── tasks/            # Task definitions
│   ├── main.yml
├── handlers/         # Task notifications (e.g., restart services)
│   ├── main.yml
├── templates/        # Jinja2 templated files
├── files/            # Static files copied to hosts
├── meta/             # Role metadata
│   ├── main.yml
├── README.md         # Documentation
```

### **🔹 Using the Role in a Playbook**
```yaml
- name: Deploy Web Server
  hosts: web_servers
  become: yes
  roles:
    - my_role
```

---

## 📌 Error Handling in Ansible

### **🔹 1️⃣ Using `ignore_errors` (Continue on Failure)**
```yaml
- name: Install a package (ignoring errors)
  ansible.builtin.apt:
    name: nonexistent-package
    state: present
  ignore_errors: yes
```
✅ Useful when failures **should not stop execution**.

---

### **🔹 2️⃣ Using `failed_when` (Custom Failure Conditions)**
```yaml
- name: Check if a service is running
  ansible.builtin.command: systemctl is-active nginx
  register: nginx_status
  failed_when: "'inactive' in nginx_status.stdout"
```
✅ Defines **custom conditions for failure**.

---

### **🔹 3️⃣ Using `block`, `rescue`, and `always` (Try-Catch Equivalent)**
```yaml
- name: Example of error handling
  hosts: all
  become: yes
  tasks:
    - block:
        - name: Install a package
          ansible.builtin.apt:
            name: nonexistent-package
            state: present

      rescue:
        - name: Handle installation failure
          ansible.builtin.debug:
            msg: "Installation failed, but we are recovering."

      always:
        - name: Cleanup task
          ansible.builtin.debug:
            msg: "This task always runs, whether success or failure."
```
✅ Helps **handle failures gracefully**.

---

### **🔹 4️⃣ Using `until` (Retry on Failure)**
```yaml
- name: Retry until success
  ansible.builtin.shell: curl -sSf http://example.com
  register: result
  retries: 5
  delay: 10
  until: result.rc == 0
```
✅ Retries a task **until it succeeds**.

---

### **🔹 5️⃣ Using `notify` and `handlers` (Fail-Safe Recovery)**
```yaml
- name: Ensure Nginx is running
  hosts: all
  become: yes
  tasks:
    - name: Install Nginx
      ansible.builtin.apt:
        name: nginx
        state: present
      notify: Restart Nginx

  handlers:
    - name: Restart Nginx
      ansible.builtin.systemd:
        name: nginx
        state: restarted
```
✅ Restarts a service **only when necessary**.

---

### **🔹 6️⃣ Debugging Errors (`debug` and `register`)**
```yaml
- name: Run a command
  ansible.builtin.command: ls /nonexistent-directory
  register: ls_output
  ignore_errors: yes

- name: Show command output
  ansible.builtin.debug:
    var: ls_output
```
✅ Helps debug issues **before they break automation**.

---

## **📌 Best Practices for Playbooks, Roles & Error Handling**
✔ Use **roles** for reusable, modular automation.  
✔ Use `defaults/` for **optional settings** and `vars/` for **required ones**.  
✔ Handle errors **gracefully** using `block` & `rescue`.  
✔ Use `until` for **unstable operations**.  
✔ Always log outputs using `debug` for **better troubleshooting**.

---

🎯 **Now you’re ready to implement Ansible playbooks, roles, and advanced error handling in your automation!** 🚀
