# file auto backup script

#!/bin/bash

backup_dir= "/Volumes/madhu/MADHU/backups"
source_dir="/home/madhu/src"

tar -czf "$backup_dir/backup_$(date+%Y%m%d_H%M%S).tar.gz "$source_dir"