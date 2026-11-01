---
title: Static Routing Configuration | Cisco Packet Tracer
date: 2026-11-01 13:00:00
description: Learn Static Routing Configuration in Cisco Packet Tracer using practical CLI commands. Connect two different networks, configure static routes
categories:
  - Tutorials
thumbnail: images/static-routing.png
---
# Static Routing Configuration | Cisco Packet Tracer

### 1. Network Details

|Device|Interface|IP Address|
|---|---|---|
|Router R1|G0/0|192.168.1.1|
|Router R1|S0/0/0|10.10.10.1|
|Router R2|S0/0/0|10.10.10.2|
|Router R2|G0/0|192.168.2.1|
|PC0|FastEthernet|192.168.1.10|
|PC1|FastEthernet|192.168.2.10|

Network Information:

|Network|Subnet Mask|
|---|---|
|LAN 1: 192.168.1.0/24|255.255.255.0|
|LAN 2: 192.168.2.0/24|255.255.255.0|
|Serial Link: 10.10.10.0/30|255.255.255.252|

### 2. Router R1 Configuration

Open Router R1 → CLI and execute:

```
enable
configure terminal

hostname R1

interface gigabitEthernet 0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

interface serial 0/0/0
ip address 10.10.10.1 255.255.255.252
no shutdown
exit

ip route 192.168.2.0 255.255.255.0 10.10.10.2

end
copy running-config startup-config
```

### 3. Router R2 Configuration

Open Router R2 → CLI and execute:

```
enable
configure terminal

hostname R2

interface gigabitEthernet 0/0
ip address 192.168.2.1 255.255.255.0
no shutdown
exit

interface serial 0/0/0
ip address 10.10.10.2 255.255.255.252
no shutdown
exit

ip route 192.168.1.0 255.255.255.0 10.10.10.1

end
copy running-config startup-config
```

Note: If the serial interface is the DCE side, configure a clock rate, for example:

```
clock rate 64000
```

Enter this command under the serial interface on the DCE router only. Your serial interface numbering may vary depending on the router model.

### 4. PC Configuration

Go to PC → Desktop → IP Configuration.

PC0 (LAN 1):

- IP Address: 192.168.1.10
    
- Subnet Mask: 255.255.255.0
    
- Default Gateway: 192.168.1.1
    

PC1 (LAN 2):

- IP Address: 192.168.2.10
    
- Subnet Mask: 255.255.255.0
    
- Default Gateway: 192.168.2.1
    

### 5. Verification

Router CLI:

```
show ip interface brief
show ip route
show running-config
```

Check the routing table for static routes marked with S.

PC0 Command Prompt:

```
ping 192.168.1.1
ping 192.168.2.10
```

PC1 Command Prompt:

```
ping 192.168.2.1
ping 192.168.1.10
```

Note: If ping fails, check interface status, serial link connectivity, IP addresses, default gateways, and static routes.

### 6. Result

Static routing configuration completed successfully. Both Cisco routers are configured with static routes, allowing devices in LAN 1 and LAN 2 to communicate with each other.

Remember: Static routing is a manual routing method in which network administrators configure routes to reach remote networks using the `ip route` command. Unlike dynamic routing, static routes do not automatically update when network topology changes.