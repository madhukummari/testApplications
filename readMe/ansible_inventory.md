# Ansible Inventory Files - Detailed Notes

## 📌 What is an Ansible Inventory File?
An **inventory file** is used by **Ansible** to define the **hosts (nodes)** it manages. It lists the **IP addresses or hostnames** of target machines and allows **grouping, variables, and connection settings**.

### **🔹 Why Use Inventory Files?**
✅ Defines which hosts Ansible manages.  
✅ Allows grouping of servers based on roles (e.g., web, database, app).  
✅ Supports multiple formats: **INI (`.ini`) and YAML (`.yaml`)**.  
✅ Enables host-specific variables for custom configurations.  

---

## 📌 Where Are Inventory Files Stored?
By default, Ansible looks for an inventory file in:  
```
/etc/ansible/hosts
```
However, you can specify a custom inventory file with the `-i` option:
```bash
ansible -i inventory.ini all -m ping
```

---

## 📌 Inventory File Formats: INI vs YAML
Ansible supports **two main formats** for inventory files: **INI (`.ini`)** and **YAML (`.yaml`)**.

### **🔹 INI Format (Simple & Common)**
```ini
[web_servers]
web1.example.com
web2.example.com

[db_servers]
db1.example.com ansible_user=admin ansible_port=2222
```
**✅ Best for:** Small setups, simple static configurations.

### **🔹 YAML Format (Structured & Readable)**
```yaml
all:
  children:
    web_servers:
      hosts:
        web1.example.com:
        web2.example.com:
    db_servers:
      hosts:
        db1.example.com:
          ansible_user: admin
          ansible_port: 2222
```
**✅ Best for:** Large-scale environments, dynamic inventory.

---

## 📌 Inventory File Sections & Syntax
| **Section**        | **Description**           |  **Example** |
|--------------------|---------------------------|------------|
| **`[group]`**      | Defines a host group      | `[web_servers]` |
| **`host`**         | Individual host entry     | `web1.example.com` |
| **`ansible_user`** | SSH user for the host     | `ansible_user=ubuntu` |
| **`ansible_port`** | SSH port                  | `ansible_port=2222` |
| **`children`**     | Defines sub-groups (YAML) | `children:` |

---

## 📌 Using Inventory Files with Ansible
### **🔹 Run Commands on All Hosts**
```bash
ansible all -i inventory.ini -m ping
```

### **🔹 Run Commands on a Specific Group**
```bash
ansible web_servers -i inventory.ini -m shell -a 'uptime'
```

### **🔹 Run a Playbook with a Custom Inventory**
```bash
ansible-playbook -i inventory.yaml site.yml
```

---

refer test folder in workspace for inv files


all:
  children:
    web_servers:
      hosts:
        server.node01.com:
    app_servers:
      hosts:
        server.node02.com
    dbserver:
      hosts:
        server.node03.com
                         