## 📌 Shell Script Flags - Essential Guide

### **🔹 1️⃣ File & Directory Checks**
| **Flag** | **Usage** | **Description** |
|---------|----------|--------------|
| `-e` | `[ -e /path/to/file ]` | Check if **file exists** |
| `-f` | `[ -f /path/to/file ]` | Check if **regular file exists** |
| `-d` | `[ -d /path/to/dir ]` | Check if **directory exists** |
| `-s` | `[ -s file ]` | Check if file **is not empty** |

Example:
```bash
if [ -d "/etc/nginx" ]; then
    echo "Nginx directory exists."
fi
```

---

### **🔹 2️⃣ String & Variable Checks**
| **Flag** | **Usage** | **Description** |
|---------|----------|--------------|
| `-z` | `[ -z "$VAR" ]` | Check if **string is empty** |
| `-n` | `[ -n "$VAR" ]` | Check if **string is NOT empty** |

Example:
```bash
if [ -z "$USER" ]; then
    echo "User variable is empty."
fi
```

---

### **🔹 3️⃣ Numeric Comparisons**
| **Flag** | **Usage** | **Description** |
|---------|----------|--------------|
| `-eq` | `[ "$a" -eq "$b" ]` | Equal to |
| `-ne` | `[ "$a" -ne "$b" ]` | Not equal to |
| `-gt` | `[ "$a" -gt "$b" ]` | Greater than |
| `-lt` | `[ "$a" -lt "$b" ]` | Less than |

Example:
```bash
if [ "$age" -gt 18 ]; then
    echo "You are an adult."
fi
```

---

### **🔹 4️⃣ Command Execution & Status Check**
| **Flag** | **Usage** | **Description** |
|---------|----------|--------------|
| `command -v` | `command -v python3` | Check if **command exists** |
| `!` | `if ! command -v curl` | Run condition **if command does NOT exist** |
| `$?` | `if [ $? -eq 0 ]` | Check **exit status** of last command |

Example:
```bash
if command -v nginx &> /dev/null; then
    echo "Nginx is installed."
else
    echo "Nginx is NOT installed."
fi
```

---

### **🔹 5️⃣ File Permissions**
| **Flag** | **Usage** | **Description** |
|---------|----------|--------------|
| `-r` | `[ -r file ]` | Check if file **is readable** |
| `-w` | `[ -w file ]` | Check if file **is writable** |
| `-x` | `[ -x file ]` | Check if file **is executable** |

Example:
```bash
if [ -x "/usr/bin/python3" ]; then
    echo "Python3 is executable."
fi
```

---

### **🔹 6️⃣ Combining Flags in Conditions**
You can **combine multiple flags** using `&&` (AND) and `||` (OR):

✅ **Check if a File Exists AND is Writable**
```bash
if [ -f "/etc/hosts" ] && [ -w "/etc/hosts" ]; then
    echo "File exists and is writable."
fi
```

✅ **Install a Package if It's Not Installed**
```bash
if ! command -v curl &> /dev/null; then
    echo "Installing curl..."
    sudo apt install -y curl
fi
```

---

## **📌 Summary of Essential Shell Script Flags**
| **Category** | **Most Useful Flags** |
|-------------|-----------------------|
| **File Checks** | `-e`, `-f`, `-d`, `-s` |
| **String Checks** | `-z`, `-n` |
| **Numeric Comparisons** | `-eq`, `-ne`, `-gt`, `-lt` |
| **Command Checks** | `command -v`, `$?`, `!` |
| **File Permissions** | `-r`, `-w`, `-x` |