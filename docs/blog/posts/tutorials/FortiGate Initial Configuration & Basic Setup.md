---
title: Basic Configuration of a FortiGate Firewall
date: 2026-10-11
categories:
  - Tutorials
description: Basic Configuration of a FortiGate Firewall
thumbnail: images/Basic Configuration of a FortiGate Firewall.svg
---
# 1. Default / Basic Information

- FortiGate can be accessed through the **Management Interface** using HTTPS.
- The exact default interface configuration depends on the **FortiGate model and FortiOS version**.
- Always verify the interface configuration before making changes.
- NAT is normally enabled on the **LAN → WAN firewall policy** when internet access is required.

### Basic CLI Command

Display the complete configuration:

```bash
show full-configuration
```

Check the current interface configuration:

```bash
show system interface
```

Check routing table:

```bash
get router info routing-table all
```

---

# 2. Initial Setup

## 2.1 Access FortiGate Management Interface

Connect a computer to the FortiGate management/LAN interface.

Open a browser:

```
https://<FortiGate-IP>
```

Example:

```
<https://192.168.1.99>
```

Log in using the administrator account.

> Change the default administrator password immediately.

---

## 2.2 Change Admin Password

### GUI

Go to:

**System → Administrators**

Select the administrator account and change the password.

Use a strong password containing:

- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

---

# 3. Basic System Settings

## 3.1 Change Hostname

### GUI

Go to:

**System → Settings → Hostname**

Example:

```
Fortune-Park
```

### CLI

```bash
config system global
    set hostname "Fortune-Park"
end
```

Verify:

```bash
get system status
```

---

## 3.2 Set Idle Timeout

### GUI

Go to:

**System → Settings → Idle Timeout**

Recommended:

```
30 Minutes
```

This automatically logs out an inactive administrator session.

---

# 4. Network Interface Configuration

## 4.1 WAN Interface

The WAN interface connects FortiGate to the ISP/router/Internet.

### GUI

Go to:

**Network → Interfaces**

Select the interface connected to the ISP.

Example:

```
Interface: port1
Alias: WAN
Role: WAN
```

### Addressing Mode

Select the mode provided by your ISP:

- DHCP
- Manual/Static
- PPPoE

### For Static ISP

Enter:

```
IP Address:     <ISP IP>
Netmask:        <ISP Netmask>
Gateway:        <ISP Gateway>
```

Example:

```
IP:              203.0.113.10
Netmask:         255.255.255.252
Gateway:         203.0.113.9
```

### Administrative Access

Enable only the access methods required for administration.

Recommended:

```
HTTPS
SSH
PING
```

Avoid exposing unnecessary management services such as:

```
HTTP
Telnet
```

> Do not expose FortiGate administration to the Internet unless there is a specific requirement and appropriate restrictions are configured.

---

# 5. LAN Interface Configuration

The LAN interface connects FortiGate to internal hotel devices.

### GUI

Go to:

**Network → Interfaces**

Select the LAN interface.

Configure:

```
Alias:              LAN
Role:               LAN
Addressing Mode:    Manual
IP/Netmask:         Internal LAN IP
```

Example:

```
IP Address: 10.1.1.1
Netmask:    255.255.255.0
```

This creates:

```
Network: 10.1.1.0/24
Gateway: 10.1.1.1
```

### Administrative Access

Enable:

```
HTTPS
SSH
PING
```

Only enable management access that is actually required.

---

# 6. Configure LAN DHCP

If FortiGate will provide DHCP to LAN devices, enable DHCP on the LAN interface.

### Example

Network:

```
10.1.1.0/24
```

Gateway:

```
10.1.1.1
```

DHCP Range:

```
10.1.1.100 – 10.1.1.254
```

Reserve addresses outside the DHCP range for devices requiring static IPs.

Example:

```
10.1.1.2 – 10.1.1.99
```

can be used for:

- Servers
- Printers
- Switches
- Access Points
- CCTV/NVR
- Network equipment
- Other infrastructure

### DNS

You can provide either:

```
FortiGate LAN IP
```

or appropriate external DNS servers to clients, depending on the FortiGate DNS design.

---

# 7. Configure LAN Interface Using CLI

Example:

```bash
config system interface
    edit "port1"
        set mode static
        set ip 192.168.0.1 255.255.255.0
        set allowaccess ping https ssh
    next
end
```

> Replace `port1` and the IP address with the actual interface and network used in your environment.

---

# 8. DNS Configuration

## 8.1 Configure DNS Using GUI

Go to:

**Network → DNS**

Select:

**Specify**

Example:

```
Primary DNS:     8.8.8.8
Secondary DNS:   1.1.1.1
```

Alternative DNS servers may be used according to your organization's requirements.

---

## 8.2 Configure DNS Using CLI

```bash
config system dns
    set primary 8.8.8.8
    set secondary 1.1.1.1
end
```

Verify:

```bash
show system dns
```

---

# 9. Default Route

The default route tells FortiGate where to send traffic destined for networks that are not directly connected.

### GUI

Go to:

**Network → Static Routes**

Create a new route.

Configure:

```
Destination:     0.0.0.0/0
Gateway:         <ISP Gateway>
Interface:       WAN
```

Example:

```
Destination:     0.0.0.0/0
Gateway:         192.168.0.1
Interface:       WAN
```

> The gateway must be the **ISP/upstream gateway**, not the FortiGate's own WAN IP.

---

## 9.1 Default Route Using CLI

```bash
config router static
    edit 1
        set dst 0.0.0.0 0.0.0.0
        set gateway <ISP-GATEWAY>
        set device "wan1"
    next
end
```

Example:

```bash
config router static
    edit 1
        set dst 0.0.0.0 0.0.0.0
        set gateway 192.168.0.1
        set device "wan1"
    next
end
```

Verify:

```bash
get router info routing-table all
```

---

# 10. Firewall Policy – Allow Internet

A firewall policy is required to allow LAN users to access the Internet.

### GUI

Go to:

**Policy & Objects → Firewall Policy**

Click:

**Create New**

Configure:

```
Name:                 LAN-to-Internet
Incoming Interface:   LAN
Outgoing Interface:   WAN
Source:               LAN subnet / appropriate address object
Destination:          All
Schedule:             Always
Service:              ALL
Action:               ACCEPT
```

### NAT

Enable:

```
NAT
```

For a typical internet connection, use:

```
Use Outgoing Interface Address
```

This allows multiple internal devices to share the WAN public IP.

---

# 11. Security Profiles

Security profiles provide additional protection to traffic passing through the firewall.

Depending on the FortiGate model, FortiOS version, and available licenses, profiles may include:

### Antivirus

Scans traffic/files for malware.

### Web Filter

Controls access to websites/categories.

Examples:

```
Malware
Adult
Gambling
P2P
Phishing
```

### DNS Filter

Controls DNS-based access to unwanted or malicious domains.

### Application Control

Controls applications such as:

```
Gaming
Social Media
P2P
Remote Access
Streaming
```

### IPS

Detects and blocks known network attacks and suspicious traffic.

---

# 12. Apply Security Profiles to Firewall Policy

Edit the:

```
LAN-to-Internet
```

policy.

Enable the required security profiles.

Example:

```
Antivirus
Web Filter
DNS Filter
Application Control
IPS
```

The exact profiles should be selected according to the hotel's security requirements and FortiGuard licensing.

> Do not enable every security feature blindly. Configure and test profiles carefully because some inspection features can affect applications, websites, and performance.

---

# 13. Per-Service Policies

Separate service policies can be created when different traffic requires different security or access rules.

Examples:

### DNS

```
Source:       LAN
Destination:  DNS servers
Service:      DNS
Action:       ACCEPT
```

### HTTP/HTTPS

```
Source:       LAN
Destination:  All
Service:      HTTP/HTTPS
Action:       ACCEPT
```

### Email

Use appropriate email services or a service group.

For example:

```
SMTP
SMTPS
POP3
POP3S
IMAP
IMAPS
```

However, **separate policies are not required simply to provide normal Internet access**.

A properly configured LAN → WAN policy is normally sufficient for basic Internet connectivity.

---

# 14. Firewall Policy Order

FortiGate processes firewall policies from **top to bottom**.

Example:

```
1. Block-Specific-Traffic
2. Allow-Specific-Service
3. LAN-to-Internet
```

More specific rules should normally be placed above broader rules.

The general:

```
LAN-to-Internet
```

policy should normally be below more restrictive/specific policies.

---

# 15. Basic Connectivity Testing

After configuration, test the following in order.

## 15.1 Test LAN Gateway

From a client:

```bash
ping 10.1.1.1
```

Expected:

```
Reply from 10.1.1.1
```

---

## 15.2 Test Internet IP

```bash
ping 8.8.8.8
```

If this works, Internet routing is likely working.

---

## 15.3 Test DNS

```bash
nslookup google.com
```

or:

```bash
ping google.com
```

If `8.8.8.8` works but `google.com` does not, investigate DNS.

---

# 16. Useful FortiGate Verification Commands

## System Information

```bash
get system status
```

## Interface Information

```bash
get system interface
```

or:

```bash
show system interface
```

## Routing Table

```bash
get router info routing-table all
```

## Firewall Policy

```bash
show firewall policy
```

## DNS

```bash
show system dns
```

## ARP Table

```bash
get system arp
```

## DHCP Information

```bash
show system dhcp server
```

## Check Session Information

```bash
diagnose sys session list
```

---

# 17. Basic Troubleshooting Commands

## Ping from FortiGate

```bash
execute ping 8.8.8.8
```

Test DNS:

```bash
execute ping google.com
```

Traceroute:

```bash
execute traceroute 8.8.8.8
```

Check interface status:

```bash
get system interface physical
```

---

# 18. Configuration Backup

After completing the initial configuration, take a configuration backup.

### GUI

Go to the appropriate configuration/backup section under:

**System → Configuration**

Download and securely store the configuration backup.

Recommended naming format:

```
FortiGate-Fortune-Park-Initial-Config-2026-10-07.conf
```

Keep backups in a secure IT location.

---

# 19. Recommended Basic Configuration Structure

A basic hotel FortiGate network can be structured like this:

```
                    INTERNET
                       │
                       │
                  ISP / ILL
                       │
                       │
                  [ WAN ]
                 FORTIGATE
                  [ LAN ]
                       │
                 Core Switch
                       │
       ┌───────────────┼───────────────┐
       │               │               │
     PCs            Servers          Wi-Fi
       │               │               │
   Printers          PMS/POS       APs/Users
```

For a larger hotel network, consider separating important systems using VLANs.

Example:

```
VLAN 10  Management
VLAN 20  Staff
VLAN 30  Guest Wi-Fi
VLAN 40  CCTV
VLAN 50  POS
VLAN 60  Servers
VLAN 70  Voice/EPABX
```

This provides better security and control than keeping every device in one LAN.

---

# 20. Initial Configuration Checklist

|Item|Status|
|---|---|
|FortiGate management access|☐|
|Admin password changed|☐|
|Hostname configured|☐|
|Idle timeout configured|☐|
|WAN configured|☐|
|LAN configured|☐|
|DHCP configured|☐|
|DNS configured|☐|
|Default route configured|☐|
|LAN → WAN policy created|☐|
|NAT enabled|☐|
|Security profiles configured|☐|
|Internet connectivity tested|☐|
|DNS tested|☐|
|Routing verified|☐|
|Configuration backed up|☐|

---

# 21. Recommended Configuration Order

For a new FortiGate installation, follow this order:

```
1. Login to FortiGate
       ↓
2. Change Admin Password
       ↓
3. Configure Hostname
       ↓
4. Configure Idle Timeout
       ↓
5. Configure WAN
       ↓
6. Configure LAN
       ↓
7. Configure DHCP
       ↓
8. Configure DNS
       ↓
9. Configure Default Route
       ↓
10. Create LAN → WAN Firewall Policy
       ↓
11. Enable NAT
       ↓
12. Configure Security Profiles
       ↓
13. Test Gateway
       ↓
14. Test Internet IP
       ↓
15. Test DNS
       ↓
16. Verify Firewall Sessions/Logs
       ↓
17. Backup Configuration
```

### Important

The exact **interface names (`port1`, `wan1`, `port2`, etc.)**, available options, and CLI syntax can vary by **FortiGate model and FortiOS version**. Always verify the actual interface name before running CLI commands.