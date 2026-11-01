---
title: Basic configuration on Cisco Router
date: 2026-11-01 11:00:00
categories:
  - Tutorials
description: Configured a Cisco router using CLI, including hostname, passwords, interface IP address, and interface activation.
thumbnail: images/router-config.png
---
# Practical Lab: Basic Router Configuration

Software: Cisco Packet Tracer  
Device: Cisco 2911 Router

### 1. Network Details

|Device|IP Address|
|---|---|
|Router G0/0|192.168.1.1|
|PC0|192.168.1.10|
|PC1|192.168.1.20|
|Subnet Mask|255.255.255.0|

### 2. Router Configuration

Open Router → CLI and execute:

```
enable
configure terminal

hostname R1
enable secret cisco123

line console 0
password console123
login
exit

interface gigabitEthernet 0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

end
copy running-config startup-config
```

### 3. PC Configuration

Go to PC → Desktop → IP Configuration.

- PC0: 192.168.1.10
    
- PC1: 192.168.1.20
    
- Subnet Mask: 255.255.255.0
    
- Default Gateway: 192.168.1.1
    

### 4. Verification

Router CLI:

```
show ip interface brief
show running-config
```

PC Command Prompt:

```
ping 192.168.1.1
ping 192.168.1.20
```

### Result

Basic router configuration completed successfully. Router interface is configured and network connectivity is verified.