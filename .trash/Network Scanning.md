---
title: Network Scanning
date: 2026-10-12
categories:
  - Tutorials
description: Network Scanning
thumbnail: images/Network Scanning.png
---
[https://youtu.be/27zYf9EPhWw?si=GJqzQNKSNa6glxZe](https://youtu.be/27zYf9EPhWw?si=GJqzQNKSNa6glxZe)

---

### CHECKING CONNECTIVITY WITH TARGET MACHINE

`Ping -` Check Connectivity with target

Ping command use icmp packets to check the connectivity.

`nmap -sn <ip-address>` — Ping scan to check if host is up (no port scan).

//If you are not getting ping from target/target showing seems down, then ,may be ping request is blocked in network by windows/network firewall (ON), which is blocking icmp packets then we use Evasion Techniques by nmap to check the host is live or not—

**ARP :** ARP, or Address Resolution Protocol, is **a mechanism that maps IP addresses to MAC addresses within a local area network (LAN)**. It essentially helps devices on the same network find the physical address (MAC address) of a device when only its logical address (IP address) is known.

`arp -e` - To check the ARP Table in linux machine

we will raise a arp request then our system will broadcast this request, in this request we will mention our target machine IP then target machine check this request and find their ip address then this machine send reply. if we get reply that means host is up in network.

`sudo nmap -sn <ip-address> -PR` — ARP ping scan (good for LAN)

---

### COUNT THE HOPE TILL THE TARGET MACHINE

To check how many hop(router) are coming between attacker and target machine, we use traceroute command.

`nmap -sn --traceroute <ip-address >` — Ping scan + traceroute.

---

### STOP DNS RESOLUTION

When we reached to any domain it always resolve this domain name to IP address first so if we want to stop this dns resolution, and reach to the domain server directly we can do this by using nmap as below:

`nmap -n <domain-name>` — Scan host without DNS resolution.

By default [google.co](http://google.co)m use 8.8.8.8 ad dns server then we can also change the dns server address.

`nmap <domain-name> --dns-servers 1.1.1.1` — Use custom DNS.

//Cloudflare provides a fast, secure, and reliable DNS service, including both authoritative and secondary DNS options. Cloudflare's primary public DNS resolver address is 1.1.1.1.

---

### SKIP SENDING PING (ICMP PACKETS)

If we don’t want to check the connectivity with host that means dont want to send any ping(icmp packet) to target machine then we can do this by.

`nmap -n <domain-name> -Pn` —Scan host without DNS resolution. + treat host as up (skip ping).

by this command icmp packet will skip.

---

### **PORT SCANNING**

When we Scanning ports in network then we can get the various state of the ports like open, closed, filtered, unfiltered, open/filtered, close/filtered.

**Port State:**

- **Open**: Open indicates that a service is listening for connections on this port.
- **Closed**: Closed indicates that the probes were received, but it was concluded that there was no service running on this port.
- **Filtered**: Filtered indicates that there were no signs that the probes were received and the state could not be established. It also indicates that the probes are being dropped by some kind of filtering.
- **Unfiltered**: Unfiltered indicates that the probes were received but a state could not be established.
- **Open/Filtered**: This indicates that the port was filtered or open but the state could not be established.
- **Close/Filtered**: This indicates that the port was filtered or closed but the state could not be [established](http://established.in).

**Scan ports on a list of a IP addresses.**

If we have a list of ip address then we can it by below command se:

`cat > iplist.txt` — Save IP list.

`nmap -iL iplist.txt` — Scan from list.

**Random Scan on Internet**

`nmap -iR -` scan random hosts alive on internet

`nmap -p telnet <ip-address>` - Scan the telnet port by it’s name.(if we don’t know the port number)

`nmap -e wlan0 <ip-addr>` — Scan by specify through a interface

---

### CHECKING THE SERVICE VERSION

`nmap -sV <ip-addres> -p 21` — Version detection for FTP service only

`nmap -sV <ip-addr>` — Detect versions from defaults open ports for all the services

`nmap -sV --version-intensity 9 -p 21 <ip-addr>` — Max version scan.

---

### DETECTING THE TARGET OS NAME

`nmap -O <ip-addr>` — OS detection.

`nmap -O --osscan-guess <ip-addr>` — Guess OS more aggressively.

**Passive OS fingerprinting and Banner Grabbing**

Analyzing TTL Value and windows size

|**OS**|**TTL**|**TCP Window Size**|
|---|---|---|
|Linux|64|5840|
|Windows|128|8192|
|Cisco|225|4128|

When we ping any target then in reply we get a TTL Value so by this value we can verify which os is running on target machine.

`C:\Users\HFCS>ping 192.168.138.7`

Pinging 192.168.138.7 with 32 bytes of data:  
**Reply from 192.168.138.7: bytes=32 time=30ms TTL=64  
Reply from 192.168.138.7: bytes=32 time=2ms TTL=64  
Reply from 192.168.138.7: bytes=32 time=2ms TTL=64  
Reply from 192.168.138.7: bytes=32 time=2ms TTL=64**

as per above example of the ping we can check TTL value is 64 then we can sure that any linux os is running on this machine.

---

### SCANNING IPV6

- `nmap -6 <ipv6> -p 21` — Ping/port scan over IPv6.

---

### AGREESSIVE SCAN

Using aggressive scan we can detect OS, Version, run default scripts, traceroute and do many more thing and get the result.

- `sudo nmap -A <ip-add>` — Aggressive scan: OS, host computer name, version, script, traceroute,

---

### SCAN UNFILTERED, OPEN/FILTERED, CLOSE/FILTERED USING EVASION TECHNIQUES

In port scanning, "unfiltered" indicates that the port is accessible but Nmap can't determine if it's open or closed. "Open/Filtered" means Nmap can't tell if a port is open or filtered, while "Closed/Filtered" indicates the same uncertainty but for a closed or filtered state. these state we find due to some security devices using in network like **Firewall, IDS, IPS.**

`nmap -p 21 192.168.2.1` - default scanning port 21

with above default scanning if we are getting host down in network then then may be icmp traffic is blocked in network because it scanning the port using icmp packets. We could not get ping reply also, because icmp traffic may be blocked.

So, in this case we can skip the ping discovery using below command and only give me result of port state only.

`nmap -p 21 192.168.2.1 -Pn` - default scanning port 21 (skip ping discovery)

With above command if we found the port is open or closed that is good but if port showing filtered then Now, we can find out the actual port state Steel scan or half open scan in **Evasion Techniques** in Wireshark by analyzing the packet.

Wireshark is **a free and open-source network protocol analyzer used to capture and analyze network traffic**. It acts as a "packet sniffer," intercepting and displaying network packets, providing deep insights into network communication. This tool is valuable for troubleshooting, security analysis, and understanding how applications communicate across network.

Basic filters in Wireshark-

`ip.addr == <ip-addr> -` filter packets from/to of specific ip address

`ip.scr == <ip-addr> -` filter packets from of specific ip address

`ip.dst == <ip-addr> -` filter packets to of specific ip address

`tcp.port==21 -` filter the packets of a specific protocol/port

\\before moving to Wireshark we have to be cleared about how TCP Communication works in network. How connection establish using 3-way handshake, data delivered on destination and and finally how connection closed. Information about TCP Header, TCP Flags, Window.

So as we know TCP send the data only after establish the connection using 3-way handshake.

In Steel Scan/half open scan we send a SYN packet from our attacker machine to the target machine and we wait for his reply, if host is replied then we can sure that the target system is on/live in network and the protocol with which we sent the packets on that machine is responding, that meaning the protocol’s port is open. it we get RST flag that means port is closed.

`nmap -p 21 <ip-address> -sS` — Send a SYN Packet on target machine(stealthier).

`nmap -p 21 <ip-address>` - work same a above command without using **-sS**

![image.png](attachment:4e4916bb-f7d2-4943-89e9-cf1e1b751e76:image.png)

with this command if we are not getting ACK(open) or RST(close) flag from host machine that means most of the possible chances port is closed or any firewall/IPS/IDS is denying out packet to enter in network.

if we ge**t ACK** flag then port is **open**, but if receive **RST Flag** that means Port is **Close.**

---

### **XMAS/CRISTMAS SCAN**

**Xmas/Crismas Scan** is a port scan technique where we send FIN and PSH packet to the target machine and wait for the reply.

`sudo nmap -sX -p 21 <ip-addr>` — Xmas scan (stealth technique).

In reply from target machine if we did not get any RST flag that means port is open and if get RST Flag then port is closed. RST Flag is alway highlighted with red color in Wireshark.

---

### NULL SCAN

in null scan we sent the the packet without any flag, that means flag value is zero.

`sudo nmap -sN -p 21 <ip-addr>` — Null scan.

---

### FIN SCAN

if we send FIN Flag to the target machine and not receiving any reply that means Port is open and Port is closed if received RST Flag.

---

### TIMING AND PERFORMANCE IN NNAP

`sudo nmap -sF -p 21 <ip-addr>` — Send FIN Packet to the target Machine

---

If Security devices in network has set the time based policy which decide to allow or deny the packets based on the packet timing frequency. then we can confuse the firewall by changing the packet speed and timing. and firewall is not able to identify they allowed for the packets.

Nmap provides several options to control scan timing and performance, including **timing templates, parallelism, and scan delay**, allowing for adjustments to scan speed, stealth, and network load.  Nmap offers a simpler approach, with six timing templates. You can specify them with the **-T option and their number (0–5) or their name**. The template names are:

Paranoid ( 0 ) - Slowest Scan

Sneaky ( 1 ) - fast than 0.

Polite ( 2 )

Normal ( 3 ) - default scan

Aggressive ( 4 ) - fast scan

Insane ( 5 ) - Very fast scan but result may not be accurate

`man nmap -` Open Nmap Manual document.

`sudo nmap <ip-add> T5 -` Very fastest scan

`sudo nmap <ip-add> T4 -` slower than T5

`sudo nmap <ip-add> T3 -` Normal Scan

`sudo nmap <ip-add> T2 -` slower than normal

`sudo nmap <ip-add> T1 -` Slow scan

`sudo nmap <ip-add> T0` Very slow scan

\\we can use these timing techniques in the nmap script which take long time to scan.

---

### SPOOF MAC OUR ADDRESS

If we don’t want that our target machine should not identify our attacker machine mac adddress, we can spoof our machine mac address using nmap in three ways—

1. Use Random MAC Address
2. Use Any popular vendor mac address
3. Manually Enter the MAC address

`nmap --spoof-mac 0 -p 21 <ip-address>` -scan port by spoof the random mac address

`nmap --spoof-mac dell -p 21 <ip-address>` - scan port by spoof the dell company mac address

`nmap --spoof-mac <mac-address> -p 21 <ip-address>` - scan port by specify the mac address manually

---

### SENDING PACKET FROM MULTIPLE IP ADDRESSES (DECOY SCAN)

Nmap will send multiple packets with different IP addresses, along with your attacker's IP address.  
Causes a decoy scan to be performed, which **makes it appear to the remote host that the host(s) you specify as decoys are scanning the target network too**. Thus their IDS might report 5–10 port scans from unique IP addresses, but they won't know which IP was scanning them and which were innocent decoys.

In decoy scan your machine can be pick any random live public IP Address from the internet to perform the attach.

`sudo nmap -sS -D RND:3 <ip-address>` - Perform scan using 3 random IP Addresses.

`sudo nmap -sS -D 2.2.2.2 <ip-address>` Perform scan using specified IP Addresses.

\\in this cas eif you know the target network private ip address then you can use their local ip address to perform the scan. Where Gateway can be allowed these packet in network by knew these are their local ip address.

---

### INCREASE/DECREASE THE SIZE OF PACKET USING MTU

MTU - Maximum transmission Unit.

`sudo nmap —mtu 16 <ip-add> -` scan by specify the size of MTU

The size of mtu always should be in multiply of 8(8, 16, 24, 32..)

---

### INCREASE/DECREASE THE SIZE OF PACKET USING FRAGMENTATION

`sudo nmap -f <ip-address> -` scan by fragment the packet into chunk of 8 bytes.

---

### IDLE IP SCAN/ZOMBIE SCAN

An idle scan, also known as a zombie scan, is a type of port scanning technique that uses a third-party host (the "zombie") to determine which ports are open on a target computer without revealing the attacker's IP address. This is achieved by spoofing the zombie's IP address and observing how the target responds to the spoofed packets.

We find the vulnerable IP address in available network and use these machine to perform the attach on target host.

But before it we have to find the vulnerable system from the network, so to find the vulnerable system we use **Metasploit framework.**

`sudo msfconsole -` launch the metasploit framework

`search idle ip` - search Modules/auxiliary

`use 0` - select the mudule

`show options`- show option to set the parameter(IP subnet range)

`set rhosts 192.168.0.0-255` - set the range of ip address to find the vulnerable IP

`exploit` - start scanning of the specified IP Range

![image.png](attachment:3e92cd74-fa83-486b-9093-6688d5e4df44:image.png)

during the scan we will see the many machine’s ip addresses. We have to choose only those IP where IPID Sequence class is **Incremental,** because these IP are only vulnerable. As per the above screeshot, scanning is still running but it give an Vulnerable IP address(192.168.154.2). So we can use this IP address to perform the zombie scan.

for more information refer the below video.

[https://www.youtube.com/embed/27zYf9EPhWw?start=5880&end=6000&autoplay=1](https://www.youtube.com/embed/27zYf9EPhWw?start=5880&end=6000&autoplay=1)

`sudo nmap —sI 192.168.154.2 192.168.154.128 -p 21` - start idle scan on port 21 without knowing your real ip address to target machine.

Now we can check and verify in packets that our system ip is not send as a source ip in Wireshark. the source ip will be that vulnerable machine ip address**(192.168.154.2)** which we find by the metasploit framework.

---

### SCAN USING SOURCE PORT

We can perform scan by specifying the source port number. This technique is useful when target network firewall allow the traffic from specific ports like 20, 53 or 80.

`sudo nmap --source-port 20 -p 21 <ip-address>` - Scan using port 20 as source

`sudo nmap --source-port 53 -p 21 <ip-address>` - Scan using DNS port as source

This can be effective since firewalls often allow traffic from certain well-known ports like FTP-DATA (20), DNS (53), or HTTP (80).

---

### NMAP SCRIPTING - Finding vulnerabilities using Nmap scripts.

**AGENDA:**

- NSE(Nmap Scripting Engine) Introduction
- Nmap Scripts Categories
- Hands on with NSE

---

### WHAT IS NSE?

NSE Stand for Nmap scripting Engine . The **Nmap Scripting Engine (NSE)** is a powerful feature of the Nmap security scanner that allows users to write and use **scripts to automate a wide variety of networking tasks**, especially **vulnerability detection, network discovery, and exploitation**.

**Developed for following reasons:**

- Network Discovery
- Service/version detection enhancements
- Vulnerability scanning (e.g., Heartbleed, SMBv1 detection)
- Brute-force logins (e.g., SSH, FTP)
- Malware/backdoor detection
- Information gathering (e.g., HTTP titles, DNS records)

EXAMPLE -

`nmap --script vuln 192.168.1.1`

---

### NMAP SCRIPT CATEGIROES

- **auth**: User authentication and privilege scripts
- **brute**: Brute-force login attempts
- **default**: Commonly used scripts (run with `sC`)
- **discovery**: Network, service, and host discovery
- **dos**: Denial of Service testing
- **exploit**: Exploits known CVEs
- **intrusive**: Aggressive, noisy scripts
- **malware**: Malware detection
- **safe**: Non-intrusive scripts
- **version**: OS and service version detection
- **vuln** (partially visible): Likely refers to vulnerability detection scripts

---

### FINDING SCRIPT IN NMAP

`ls usr/share/namp/scripts/` - list all the available scripts in your Nmap database.

`sudo nmap —script-updatedb` - update script database

`ls /usr/share/nmap/scripts | grep smb -` filter and list the all the scripts by specify type (smb)

`ls /usr/share/nmap/scripts | grep http -` filter and list the all the scripts http type

---

### PERFORMING SCRIPTS ON A TARGET MACHINE

`sudo nmap —script <script-name> <target-ip-addr>` - Performing script on a IP address

`sudo nmap --script http-enum.nse -p80 <ip-addr> -` perform the script to find out the available open directories on a target IP address or domain name.

`sudo nmap --script http-grep.nse -p80 <ip-addr> -` find the email addresses on a target machine

`nmap --script ftp-brute.nse -p21 <ip-address> -T5` - perform a brute-force attack on an FTP server running on port 21 of a target machine.

`nmap —script discovery <ip-address> -` Perform script on a IP address by category

we can perform all the script related to a specific categories, then we can perform by it’s category name and atric sign(*).

`nmap —script telnet* <ip-address> -` Perform all the telnet scripts on a IP address.

`nmap —script http-sql-injection.nse -p 80 <domain-name>` - Perform the sql vulnerability scan on a domain name.

---

### FIND OUT THE CVE ON A TARGET : VULSCAN

A CVE, or Common Vulnerabilities and Exposures, is **a publicly accessible list of known security vulnerabilities in software and hardware(**[https://cve.mitre.org/](https://cve.mitre.org/)). It's a standardized way of identifying and describing these vulnerabilities, providing a common language for security teams to share and discuss them. Essentially, a CVE is a unique identifier assigned to a specific security flaw, making it easier to track and manage vulnerabilities across different systems and tool.

This database is not available in nmap by default, so have to clone it from github.

we an install it by below command :

`sudo git clone <https://github.com/scipag/vulscan.git`> - Downloading the vulscan repository from github.

`ln -s` pwd`/scipag_vulscan /usr/share/nmap/scripts/vulscan` - Adding the vulscan data to nmap database.

`nmap -sV —script=vulscan/vulscan.nse <ip-address>` - Perform **vulscan** script to detect all known vulnerabilities on a target system.

`nmap —script http-php-version.nse -p 80 <domain-name>` - find the php version running on the target system

`sudo nmap —script vuln <ip-address> -`vulnerability scan using the built-in `vuln` script category.

`nmap —script http-vuln* <ip-addr> -` Perform all the script related to the http-vuln on target system

---

### EXPORTING SCAN RESULTS TO A FILE

`nmap -oN scanreport.txt <ip-address> -` Save the scan result in a text file.

---

### ANGRY IP SCANNER

**ngry IP Scanner**, commonly referred to as `ipscan`, is a **fast and lightweight network scanner** used to detect live hosts, open ports, and other details on a network. It’s popular among system administrators and security professionals for quickly mapping out networks.

**Key Features:**

- Scans IP addresses and ports.
- Detects live hosts using ping, TCP, or UDP.
- Fetches hostnames, MAC addresses, NetBIOS info, and more.
- Export results to TXT, CSV, or XML.
- Supports plugins for extra functionality.
- Available with both **GUI** and **command-line interface**.

**Installation:**

`sudo apt install ipscan -` install angry ip scanner on linux machine

---

### ZENMAP : GUI VERSION OF NMAP

**Zenmap** is the **official graphical user interface (GUI) for Nmap**, the powerful and widely used network scanning tool. It's designed to make Nmap more accessible to beginners while still being useful for advanced users.

**Key Features:**

- 🔍 **Visual Front-End for Nmap :** Runs Nmap scans with options selected via GUI — no need to memorize command-line syntax.
- 📋 **Scan Profiles :** Built-in scan types like “Intense Scan,” “Quick Scan,” or “Ping Scan,” and the ability to save custom profiles.
- 📊 **Graphical Output Viewer :** View results in multiple formats: list, host details, topology maps, and raw Nmap output.
- 🔁 **History Tracking :** Stores previous scans for comparison or review.

---

### GRAPHICAL TOOL FOR NETWORK MANAGEMENT AND MONITORING

**SolarWinds Network** refers to a **suite of tools** for **network performance monitoring, management, and troubleshooting**. The most popular product in this category is:

✅ Key Features:

- **Real-time network performance monitoring**
- **Bandwidth usage tracking**
- **Automatic network device discovery**
- **Custom alerts and dashboards**
- **NetPath visualization** (network path tracing)
- **Support for SNMP, WMI, NetFlow, etc.**

### Other Key SolarWinds Network Tools:

|**Tool**|**Purpose**|
|---|---|
|**Network Configuration Manager (NCM)**|Backup and manage router/switch configs|
|**NetFlow Traffic Analyzer (NTA)**|Visualize and analyze network traffic|
|**IP Address Manager (IPAM)**|Manage IP addresses, DHCP, DNS|
|**User Device Tracker (UDT)**|Locate devices and users on the network|
|**Engineer's Toolset**|Bundle of 60+ network tools (ping sweep, traceroute, SNMP tools, etc.)|

---

---

---

# THANK YOU!!!