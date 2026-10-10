---
title: Basic Configuration of a FortiGate Firewall
date: 2026-10-10
categories:
  - Documentation
description: A FortiGate firewall is commonly used to secure a network, connect a LAN to the internet, control traffic, and provide services such as NAT, VPN, and intrusion prevention.
thumbnail: images/documentation-guide.svg
---

# Basic Configuration of a FortiGate Firewall

A FortiGate firewall is commonly used to secure a network, connect a LAN to the internet, control traffic, and provide services such as NAT, VPN, and intrusion prevention.

Below is a basic setup for a new FortiGate firewall using the web interface (GUI) and CLI.

## 1. Basic network topology

Internet / ISP

Public IP address or ISP gateway

FortiGate Firewall

WAN: ISP connection

LAN: 192.168.1.1/24

LAN / Internal Users

192.168.1.0/24

PCs, switches, Wi-Fi access points

Example addressing:

|Setting|Example|
|---|---|
|LAN interface|`port2`|
|LAN IP|`192.168.1.1/24`|
|DHCP range|`192.168.1.100–192.168.1.200`|
|WAN interface|`port1`|
|WAN connection|DHCP or static IP, depending on ISP|
|DNS|ISP DNS or trusted public DNS|

These are example values. Interface names and available features vary by FortiGate model and FortiOS version.

## 2. Configure the WAN interface

The WAN interface connects the firewall to your internet service provider.

In the GUI:

1. Log in to the FortiGate management interface.
    
2. Navigate to Network → Interfaces.
    
3. Edit the WAN interface, commonly `port1`.
    
4. Set the addressing mode to match your ISP:
    
    - DHCP — the ISP automatically provides an IP address.
        
    - Static — enter the IP address, subnet mask, gateway, and DNS as required.
        
    - PPPoE — enter the ISP-provided username and password if required.
        
    
5. Enable administrative access only as needed. Avoid exposing HTTPS or SSH management to the public internet.
    

Example CLI for a DHCP-based WAN:

```
config system interface
    edit "port1"
        set mode dhcp
        set role wan
        set allowaccess ping
    next
end
```

This example assumes `port1` is the WAN interface and allows ping for basic connectivity testing. It does not configure the LAN or firewall policy.

## 3. Configure the LAN interface

The LAN interface is the gateway for internal devices.

In the GUI, go to Network → Interfaces, edit `port2`, and configure:

- Addressing mode: Manual
    
- IP address: `192.168.1.1/24`
    
- Role: LAN
    
- Administrative access: HTTPS and PING only if needed
    
- DHCP Server: Enable, if FortiGate will assign addresses to clients
    

Equivalent CLI:

```
config system interface
    edit "port2"
        set ip 192.168.1.1 255.255.255.0
        set role lan
        set allowaccess ping https
    next
end
```

Configure the DHCP server so client computers automatically receive IP addresses. FortiGate supports configuring DHCP directly on an interface.

![](https://www.google.com/s2/favicons?domain=https://docs.fortinet.com&sz=32)

Fortinet Document Library

+1

```
config system dhcp server
    edit 1
        set interface "port2"
        set default-gateway 192.168.1.1
        set netmask 255.255.255.0
        set dns-service default
        config ip-range
            edit 1
                set start-ip 192.168.1.100
                set end-ip 192.168.1.200
            next
        end
    next
end
```

## 4. Configure the firewall policy and NAT

This is the key step that permits LAN users to access the internet. FortiGate firewall policies control traffic between interfaces, and NAT translates internal addresses for internet access.

![](https://www.google.com/s2/favicons?domain=https://community.fortinet.com&sz=32)

Community

+1

In the GUI:

1. Go to Policy & Objects → Firewall Policy (or IPv4 Policy, depending on version).
    
2. Select Create New.
    
3. Enter the following example settings.
    

|Field|Value|
|---|---|
|Name|`LAN-to-Internet`|
|Incoming interface|`port2`|
|Outgoing interface|`port1`|
|Source|LAN subnet or appropriate LAN address object|
|Destination|`all`|
|Schedule|`always`|
|Service|Required services, such as DNS, HTTP and HTTPS|
|Action|`ACCEPT`|
|NAT|Enabled|

Equivalent CLI example:

```
config firewall policy
    edit 0
        set name "LAN-to-Internet"
        set srcintf "port2"
        set dstintf "port1"
        set srcaddr "all"
        set dstaddr "all"
        set schedule "always"
        set service "ALL"
        set action accept
        set nat enable
    next
end
```

Security note: `ALL` allows all service types that match the policy. For a production network, restrict services to business requirements and apply appropriate security profiles, logging, and access controls. Use `srcaddr "all"` only when the policy is intentionally limited to the dedicated LAN interface and you understand the source scope.

## 5. Configure routing

The firewall needs a route to reach the internet.

- If the WAN interface uses DHCP or PPPoE, check whether the ISP supplies a default route.
    
- If the ISP provides a static IP, configure a default route using the ISP gateway.
    

For a static WAN connection, an example CLI command is:

```
config router static
    edit 1
        set dst 0.0.0.0 0.0.0.0
        set gateway 203.0.113.1
        set device "port1"
    next
end
```

`203.0.113.1` is a documentation-only example address. Replace it with your actual ISP gateway. Do not add a duplicate default route if a suitable route is already installed.

## 6. Basic security settings

Before using the firewall in a production network, complete these tasks:

- Change the default administrator password and use a strong, unique password.
    
- Restrict administrative access to trusted management networks.
    
- Update FortiOS to a supported release appropriate for your model.
    
- Enable logging on firewall policies.
    
- Configure FortiGuard antivirus, web filtering, and intrusion prevention where appropriate and licensed.
    
- Back up the configuration after completing the setup.
    

## 7. Verify the configuration

Run these commands from the FortiGate CLI to check connectivity and configuration.

|Command|Purpose|
|---|---|
|`get system status`|Check FortiOS version and system status|
|`get system interface physical`|Inspect physical interfaces|
|`get router info routing-table all`|Check routing table|
|`get system arp`|View ARP entries|
|`execute ping 8.8.8.8`|Test IP connectivity|
|`execute ping google.com`|Test DNS resolution and connectivity|

If users cannot access the internet, check the WAN IP, default route, DNS, LAN addressing, firewall policy order, and NAT settings.

Official reference: [Fortinet — Basic configuration guide](https://docs.fortinet.com/document/fortigate/7.4.7/administration-guide/747452/basic-configuration).

![](https://www.google.com/s2/favicons?domain=https://docs.fortinet.com&sz=32)

Fortinet Document Library

+1

To give you the exact configuration commands for your firewall: Which FortiGate model and FortiOS version are you using? For example, FortiGate 60F with FortiOS 7.4. You can also tell me if you want a GUI walkthrough or a complete CLI configuration.