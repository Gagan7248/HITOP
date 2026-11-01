---
title: DHCP Configuration on Cisco Router
date: 2026-11-01 12:00:00
description: Learn how to configure DHCP on a Cisco Router using Packet Tracer. Automatically assign IP addresses, subnet masks, default gateways, and DNS settings to client PCs with simple CLI commands.
categories:
  - Tutorials
thumbnail: images/dhcp-config.png
---
# DHCP Configuration on Cisco Router

### 1. Network Details

|Device|IP Address|
|---|---|
|Router G0/0|192.168.1.1|
|PC0|Automatically (DHCP)|
|PC1|Automatically (DHCP)|
|Network|192.168.1.0/24|
|Subnet Mask|255.255.255.0|
|Default Gateway|192.168.1.1|
|DNS Server|8.8.8.8|
|DHCP Range|192.168.1.100 – 192.168.1.200|

### 2. Router Configuration

Open Router → CLI and execute:

```
enable
configure terminal

hostname R1

interface gigabitEthernet 0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

ip dhcp excluded-address 192.168.1.1 192.168.1.99

ip dhcp pool LAN-POOL
network 192.168.1.0 255.255.255.0
default-router 192.168.1.1
dns-server 8.8.8.8
exit

end
copy running-config startup-config
```

### 3. PC Configuration

Go to PC → Desktop → IP Configuration.

- PC0: Select DHCP
    
- PC1: Select DHCP
    
- Subnet Mask: Automatically assigned
    
- Default Gateway: 192.168.1.1
    
- DNS Server: 8.8.8.8
    

Both PCs should receive IP addresses automatically from the router's DHCP pool.

Example:

- PC0: 192.168.1.100
    
- PC1: 192.168.1.101
    

### 4. Verification

Router CLI:

```
show ip dhcp pool
show ip dhcp binding
show ip interface brief
show running-config
```

PC Command Prompt:

```
ipconfig
ping 192.168.1.1
ping 192.168.1.101
```

Note: Use the actual IP address assigned to the other PC when testing ping.

### 5. Result

DHCP configuration completed successfully. Cisco Router is now working as a DHCP server and automatically assigning IP addresses, subnet masks, default gateways, and DNS information to connected PCs.

Remember: DHCP automatically assigns network settings to client devices without requiring manual IP configuration.