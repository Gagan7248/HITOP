---
title: Linux For Network Engineer
date: 2026-10-12
categories:
  - Tutorials
description: Linux For Network Engineer
thumbnail: images/Linux For Network Engineer.png
---
---
- **Basics of Linux, file system and Linux commands**
- **Performing several administrative tasks (such as):**
    - IP Address / Networking
    - Installing Software Packages
    - Viewing running processes
- **Using CRON, etc.**
- **Installing and using network services such as:**
    - Web Server
    - FTP Server
    - TFTP Server
    - Syslog Server
    - File Server
    - Firewall
---

### INSTALLING/ENABLING UBUNTU IN WINDOWS (WSL)

## Installing WSL (Windows Subsystem for Linux)

`wsl.exe --list --online` - to list available distributions  
`wsl.exe --install <Distro>` to install a linux distro

## **Uninstalling WSL from Windows**

`wsl --list --verbose` -

`wsl --unregister Ubuntu`

`dism.exe /online /disable-feature /featurename:VirtualMachinePlatform /norestart dism.exe /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux /norestart`

---

### DEPLOYMENT STEPS

1. Download and Installation
2. Navigation of Desktop Experience
3. File System and General Commands
4. Users and Groups
5. File Permissions
6. Network Commands
7. IP Address and DHCP
8. Static Routes
9. Processes
10. SSH
11. File Sharing (SMB)
12. Packet Capture
13. Python
14. Background Jobs
15. CRON
16. Bash Profile
17. Syslog Server
18. TFTP Server
19. FTP Server
20. Firewall using UFW
21. Web Server

---

## FILE SYSTEM AND GENERAL COMMANDS

- `pwd` — Print current working directory.
- `ls` — List files and directories.
- `ls -l` — List files in long detailed format.
- `ls -al` — List all files (including hidden) in long format.
- `ls -al | grep <directory-name>` — List all files and filter for a specific name.
- `cd <directory-name>` — Change directory to `<directory-name>`.
- `touch <file-name>` — Create an empty file or update its timestamp.
- `mkdir <directory-name>` — Create a new directory.
- `rmdir <directory-name>` — Remove an empty directory.
- `rmdir -rf <directory-name>` (actually `rm -rf`) — Forcefully remove a directory and its contents.
- `mv <source> <destination>` — Move or rename a file or directory.
- `cp <source> <destination>` — Copy a file or directory.
- `rm <file-name>` — Delete a file.
- `cat <file-name>` — Display the full contents of a file.
- `head <file-name>` — Show the first 10 lines of a file.
- `tail <file-name>` — Show the last 10 lines of a file.
- `lsb_release -a` — Display Linux distribution information.
- `date` — Show the current date and time.
- `cal` — Display a calendar for the current month.
- `uptime` — Show how long the system has been running.
- `sudo <command>` — Run a command as a superuser.
- `sudo su` — Switch to the root user (admin mode).

---

## USERS AND GROUPS

- `whoami` — Show the current logged-in username.
- `getent group` — Display all groups from the system database.
- `id` — Show user ID (UID), group ID (GID), and group memberships.
- `groups <username>` — (Actually should be `groups <username>`) — Show groups that a user belongs to.
- `groupadd <group-name>` — Create a new group.
- `useradd -c "<comment>" <username>` — Create a new user with an optional comment (like full name).
- `passwd <username>` — Set or change a password for a user.
- `usermod -aG <groupname> <username>` — Add an existing user to a group without removing from others.
- `userdel <username>` — Delete a user account.

---

## PERMISSIONS

**Level of Permission:**

- `r` — read (4)
- `w` — write (2)
- `x` — execute (1)
- — no access

==============================

**Permission Values:**

- `7 = rwx` → 4 + 2 + 1 = 7
- `6 = rw-` → 4 + 2 + 0 = 6
- `5 = r-x` → 4 + 0 + 1 = 5
- `4 = r--` → 4 + 0 + 0 = 4

==============================

**Permission Categories:**

- **U** — User (Owner)
- **G** — Group (User Group)
- **E** — Everyone else (Others)

==============================

- `chmod 755 <filename>` — Set permissions: **rwx for user**, **r-x for group**, **r-x for others** on a file.
- `chmod -R 755 <directory-name>` — **Recursively** set 755 permissions for a directory and all its contents.
- `sudo chown <user>:<groupname> <filename>` — **Change the owner** and **group** of a file.
- `su <username>` — **Switch to another user** account (needs password of that user).

---

## ADVANCED PACKAGING TOOLS (APT)

- `apt-get` — A command-line tool to **handle packages** (older but powerful, used for scripts).
- `vi <filename>` — **Open and edit** a file using the **Vi editor** (a powerful terminal-based text editor).
- `sudo apt-get install nano` — **Install the Nano text editor** (a simpler alternative to Vi) with superuser permission.
- `cat <filename>` — **Display the content** of a file directly in the terminal.

---

## NETWORK COMMANDS

- `sudo apt install net-tools` — Install **networking tools** like `ifconfig`, `netstat`, etc.
- `sudo apt install whois` — Install the **whois tool** to query domain information.
- `sudo apt install ethtool` — Install **ethtool** to manage and check Ethernet device settings.
- `sudo apt install systat` — Install **system monitoring tools** like `iostat`, `mpstat`, etc.
- `ifconfig` — Show current **network interface** information (requires `net-tools`).
- `ifconfig -a` — Show **all interfaces** (even those that are down).
- `ip address` — Show detailed **IP address** info for all interfaces.
- `ip address show <interface-name>` — Show **IP info** for a **specific network interface** (e.g., `eth0`, `wlan0`).
- `ethtool <interface-name>` — Display or change **network interface settings**.
- `ping <ip-address>` — Send **ICMP echo requests** to test **network connectivity**.
- `traceroute <ip-address>` — Trace the **path** packets take to reach a **destination**.
- `whois <domain-name>` — Get **ownership and registrar information** about a domain.
- `tracepath <ip-address>` — Trace the **path** to a network host, **without needing root** (alternative to `traceroute`).
- `dig <domain-name>` — Perform **DNS lookup** to retrieve information about a domain.
- `nslookup <domain-name>` — Query **DNS** to get information about domain names or IP addresses.
- `netstat -r` — Display the **kernel routing table**.
- `route` — Show or manipulate the system's **IP routing table** (older tool, replaced mostly by `ip route`).
- `sudo ip route show` — Display the **current IP routing table** (modern command).
- `arp -a` — Display the **ARP table** (IP-to-MAC address mappings).
- `cat /etc/hosts` — Show the contents of the **hosts file** (local IP to domain mappings).
- `sudo nano /etc/hosts` — **Edit the hosts file** to manually **map IP addresses to domain names**.
- `wget <url>` — **Download a file** from the internet using a URL.

---

## PROCESSES

- `ps` — Show the **currently running processes** for the current user/session.
- `ps -ef` — Show **every process** running on the system in **full-format listing**.
- `ps -ef | grep <process-name>` — **Search for a specific process** by name.
- `top` — **Display live, real-time** information about running processes, CPU, and memory usage.
- `sudo kill <process-id>` — **Forcefully stop** (kill) a process by its process ID (PID).
- `cat /proc/cpuinfo` — **Display CPU hardware information** (model, cores, speed).
- `mpstat 1` — Show **CPU usage statistics** every 1 second (requires `sysstat` package).
- `cat /proc/meminfo` — **Display memory usage details** (RAM and swap memory info).
- sudo tcpdump -t ens33
- free -h
- df -h
- fdisk -l

---

## SSH SERVER

**SSH (Secure Shell)** is a **network protocol** that allows **secure remote login and communication** between two computers over an unsecured network.

**Key Concepts of SSH:**

1. **Secure Communication:**
    - SSH encrypts all data exchanged between the client and server.
    - Protects against eavesdropping, man-in-the-middle attacks, and tampering.
2. **Remote Access:**
    - Lets you **remotely access and control** another machine via a terminal/command line.
    - Commonly used by system administrators and developers.
3. **Authentication Methods:**
    - **Password-based login**
    - **Public/private key-based login** (more secure)
4. **Default Port:**
    - SSH uses **port 22** by default.
5. **Common Uses:**
    - Remote server management
    - Secure file transfer (via `scp` or `sftp`)
    - Tunneling and port forwarding
    - Git over SSH for code repositories

### **SSH Configurations :**

`sudo apt install openssh-server` - Install OpenSSH Server

`sudo systemctl status ssh` - Check SSH Service Status

`sudo systemctl enable —now ssh` - Enable and Start SSH Service Immediately

`ssh [localhost](<http://localhost>)` - Test SSH Locally

`sudo systemctll disable —now ssh` -Disable and Stop SSH Service

`sudo nano /etc/ssh/sshd_config` - Edit SSH Server Configuration File

`sudo systemctl restart ssh` - Restart SSH Service

`ssh [localhost](<http://localhost>) -p 22` - Connect to Localhost with Port number

`ssh username@<ip-addr> -p 22` - Connect to Remote Machine

---

# FILE SHARE (SMB)

**SMB (Server Message Block)** is a **network file sharing protocol** that allows computers to **read and write files, access printers, and share resources** over a local network.

It’s commonly used for **Windows file sharing**, but it also works with Linux via tools like **Samba**.

### 🔑 **Key Features of SMB:**

1. **File and Folder Sharing:**
    - Share files and directories between Windows, Linux, and macOS systems.
2. **Printer Sharing:**
    - Share printers across the network.
3. **Network Discovery:**
    - Enables browsing of shared folders on a network.
4. **Authentication & Access Control:**
    - Supports user-level access controls using usernames and passwords.

### Samba Configurations:

`sudo apt install samba` - Install Samba

`whereis samba` - Locate Samba Files to verify

`mkdir /home/hfcs/sambashare` - Create a Shared Directory

`sudo nano /etc/samba/smb.conf` - Edit Samba Configuration File

```
     **[samba share]**

comment = samba on ubuntu

path = /home/hfcs/sambashare

readonly = no

browsable = yes
```

`sudo service smbd restart` - Restart Samba Service

`sudo ufw allow samba` - Allow Samba Through the Firewall

`sudo smbpasswd -a <user-name>` - Add a Samba User

## **From a Windows Machine**

1. Open **File Explorer**.
2. In the address bar, type:

`\\192.168.1.10\samba share`

## **From Another Linux Machine**

1. Open the **Files** app (Nautilus, Dolphin, etc.).
    
2. Press `Ctrl + L` and type:
    

`smb://<Linux-IP-address>/samba share`

---

# PACKET CAPTURE

**`tcpdump`** is a powerful command-line **packet analyzer** tool used in Linux/Unix systems to **capture and inspect network traffic** in real-time.

🔑 **Key Features:**

- Captures packets from a network interface.
- Filters traffic using protocols, IP addresses, ports, etc.
- Useful for **network troubleshooting**, **security auditing**, and **protocol analysis**.

## COMMANDS:

`sudo apt insall tcpdump` - Install tcpdump

`sudo tcpdump -t eth0 ‘port 80’` - Capture HTTP (port 80) traffic on eth0

`ifconfig -a` - List all network interfaces

`sudo tcpdump -i eth0` - Capture all the traffic on eth0

Note: we can view this caps.pcap file in wireshark to monitor the packets.

---

## SEE THE BACKROUND JOBS

python3 [script.py](http://script.py) - run a script in forground

python3 [script.pt](http://script.pt) &- run a script in background

jobs - ee the task, script, running in the background

---

## CRON JOBS

**CRON jobs** in Linux are **scheduled tasks** used to automate scripts, commands, or programs at specified times or intervals. They're managed by the `cron` daemon, which runs in the background and checks every minute to see if any job is due.

![image.png](attachment:8483504a-a036-464b-bedd-20b89ffb588d:image.png)

## Schedule

||Cron Expression|Meaning|
|---|---|---|
|Every minute|`* * * * *`|Run every minute|
|Every day at 2am|`0 2 * * *`|Run daily at 2:00 AM|
|Every Sunday|`0 9 * * 0`|Run at 9 AM every Sunday|
|On Jan 1st|`0 0 1 1 *`|Run once a year (midnight)|
|Every 10 mins|`*/10 * * * *`|Run every 10 minutes|

`crontab -e -` Edit Crontab for current user

`crontab -l -` view current cron jobs

`0 3 * * * /home/user/backup.sh >> /home/user/backup.log 2>&1 -`  
Runs `/home/user/backup.sh` daily at 3:00 AM and appends both output and errors to `/home/user/backup.log`.

---

BASH PROFILE

In **Linux**, a **Bash profile** is a script file that runs automatically when you start a **login shell** using the **Bash shell** (e.g., when you log in via SSH or a terminal session).

---

# SYSLOG SERVER

A Syslog server is a centralized logging server that collects and stores log messages from various devices and systems on a network using the Syslog protocol. It’s commonly used for monitoring, troubleshooting, and maintaining security.

In Ubuntu, you can set up a Syslog server using popular software like rsyslog or syslog-ng.

`sudo apt install rsyslog` - Install rsyslog

`sudo nano /etc/rsyslog.conf` - Edit the rsyslog configuration file:

### Uncomment or add the following lines to enable UDP and TCP reception:

`module(load="imudp") input(type="imudp" port="514")`

`module(load="imtcp") input(type="imtcp" port="514")`

### Allow Syslog traffic through the firewall

`sudo ufw allow 514/udp sudo ufw allow 514/tcp`

`sudo systemctl restart rsyslog` - Restart rsyslog

`sudo netstat -tulnp | grep 514` - Verify the server is listening

### Configure clients to send logs

On client machines, edit `/etc/rsyslog.conf` or `/etc/rsyslog.d/50-default.conf` and add:

`*.* @<your-syslog-server-ip>:514 # For UDP *.* @@<your-syslog-server-ip>:514 # For TCP`

`sudo systemctl restart rsyslog` - Then restart rsyslog on the client:

---