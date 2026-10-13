---
title: IPv4 Addressing and Subnetting
date: 2026-10-13
categories:
  - Tutorials
description: Learn IPv4 addressing, subnet masks, IP address classes, CIDR, subnetting, private and public addresses, reserved ranges, ARP, and ICMP troubleshooting.
thumbnail: images/ipv4-addressing-subnetting.svg
---
# Hardware Addressing

A **hardware address** is used to uniquely identify a **host** within a **local network**. Hardware addressing is a function of the **Data-Link layer** of the **OSI model (Layer-2)**.

**Ethernet** utilizes the **48-bit MAC address** as its hardware address. The **MAC address** is often hardcoded on physical **network interfaces**, though some interfaces support changing the MAC address using special utilities. In **virtualization environments**, dynamically assigning MAC addresses is very common.

A MAC address is most often represented in **hexadecimal**, using one of two accepted formats:

```
00:43:AB:F2:32:13

0043.ABF2.3213
```

The first six hexadecimal digits of a MAC address identify the **manufacturer** of the physical network interface. This is referred to as the **OUI (Organizational Unique Identifier)**. The last six digits uniquely identify the host itself, and are referred to as the **host ID**.

The MAC address has one shortcoming – it contains **no hierarchy**. MAC addresses provide no mechanism to create boundaries between networks. There is no method to distinguish one network from another.

This lack of hierarchy poses significant difficulties to **network scalability**. If only **Layer-2 hardware addressing** existed, all hosts would technically exist on the same network. **Internetworks** like the Internet could not exist, as it would be impossible to separate my network from your network.

Imagine if the entire Internet existed purely as a single **Layer-2 switched network**. Switches, as a rule, will forward a **broadcast** out every port. With billions of hosts on the Internet, the resulting **broadcast storms** would be devastating. The Internet would simply collapse.

The scalability limitations of **Layer-2 hardware addresses** are mitigated using **logical addresses**, covered in great detail in this guide.

# Logical Addressing

## Introduction

**Logical addressing** is a networking mechanism used to identify devices and the networks to which they belong. It operates at the **Network Layer (Layer 3)** of the **OSI model**.

Unlike a hardware address, which identifies a network interface on a local network, a logical address provides a hierarchical structure that supports communication between different networks.

The most widely used logical addressing protocol is the **Internet Protocol (IP)**, which is fundamental to communication across the Internet.

## 1. What Is Logical Addressing?

Logical addressing assigns an address to a device or network interface so that it can communicate with other devices using network-layer protocols.

A logical address can generally be understood through two components:

- **Network ID:** Identifies the network to which a device belongs.
    
- **Host ID:** Identifies a particular device or interface within that network.
    

The exact division between the network and host portions depends on the IP addressing scheme and subnet mask or prefix length.

### Example

Consider the following IPv4 configuration:

- **IP address:** `192.168.1.10`
    
- **Subnet mask:** `255.255.255.0`
    
- **Network address:** `192.168.1.0`
    

With this subnet mask, the first three octets identify the network portion, while the final octet identifies the host portion.

This example represents the network `192.168.1.0/24`.

## 2. Logical Addressing and Hardware Addressing

Logical addresses and hardware addresses perform different but complementary functions.

|Feature|Logical Address|Hardware Address|
|---|---|---|
|OSI layer|Network Layer (Layer 3)|Data Link Layer (Layer 2)|
|Common example|IPv4 address|Ethernet MAC address|
|Primary purpose|Identifies a network and an interface within it|Identifies a network interface on a local link|
|Assignment|May be configured manually or dynamically|Commonly assigned to the interface, but can sometimes be changed|
|Routing role|Used by routers to make forwarding decisions|Used to deliver frames across a local link|
|Example|`192.168.1.10`|`00:43:AB:F2:32:13`|

**Key point:** IP addresses support communication across networks, while MAC addresses support frame delivery over individual data-link networks.

## 3. Internet Protocol (IP)

The **Internet Protocol (IP)** provides core services at the Network Layer. It enables devices to address packets and allows routers to forward them toward their destinations.

IP works alongside other protocols in the **TCP/IP protocol suite**. For example, **TCP** provides reliable, connection-oriented transport services, while IP handles addressing and packet forwarding at the network layer.

### Main functions of IP

1. **Logical addressing:** Identifies the source and destination interfaces using IP addresses.
    
2. **Packet delivery:** Provides a mechanism for forwarding packets across interconnected networks.
    
3. **Routing support:** Supplies destination-address information that routers use when selecting forwarding paths.
    
4. **Internetwork communication:** Enables communication between devices located on different IP networks.
    

IP itself provides a **connectionless, best-effort delivery service**. It does not guarantee that packets will arrive, arrive only once, or arrive in order.

## 4. IPv4 Addressing

**Internet Protocol version 4 (IPv4)** uses a **32-bit address**. It is commonly represented as four decimal numbers separated by periods, a format known as **dotted-decimal notation**.

Example:

`192.168.1.10`

An IPv4 address contains four **octets**, each consisting of eight bits.

|Octet|Decimal value|Binary value|
|---|---|---|
|First|192|`11000000`|
|Second|168|`10101000`|
|Third|1|`00000001`|
|Fourth|10|`00001010`|

The complete binary representation is:

`11000000.10101000.00000001.00001010`

Each octet can represent a value from **0 to 255**, giving IPv4 a theoretical address space of (2^{32}), or **4,294,967,296 addresses**.

Some addresses are reserved for special purposes, and not all IPv4 addresses are available for ordinary host assignment.

## 5. Network ID and Host ID

An IP address is interpreted using its associated **subnet mask** or **prefix length**. This identifies which bits belong to the network prefix and which bits are available for the host portion.

Consider:

- **IP address:** `192.168.1.10`
    
- **Subnet mask:** `255.255.255.0`
    
- **CIDR prefix:** `/24`
    

The first 24 bits represent the network prefix. The remaining 8 bits represent the host portion.

|Item|Value|
|---|---|
|IP address|`192.168.1.10`|
|Network address|`192.168.1.0`|
|Prefix length|`/24`|
|Broadcast address|`192.168.1.255`|
|Typical usable host range|`192.168.1.1`–`192.168.1.254`|

These values apply to a conventional IPv4 `/24` subnet. Other prefix lengths produce different network sizes and address ranges.

## 6. How Logical Addressing Supports Routing

**Routing** is the process of selecting a path and forwarding packets between IP networks.

When a device sends data to another IP address, it determines whether the destination is on the local subnet or a different network.

- **Local destination:** The sending device attempts to deliver the packet directly over the local link.
    
- **Remote destination:** The sending device typically sends the packet to its configured **default gateway**.
    

The router examines the destination IP address and consults its routing table to decide where to forward the packet next.

At each routed link, the packet is encapsulated in a data-link frame appropriate for that link. The Layer 2 addresses may change from one link to another, while the source and destination IP addresses normally remain the same from the original sender to the final destination, apart from mechanisms such as Network Address Translation (NAT).

### Example

Suppose a computer on `192.168.1.0/24` needs to communicate with a server on `192.168.2.0/24`.

Because these devices belong to different IP subnets, communication normally requires a router or another Layer 3 forwarding device.

The computer sends the packet to its default gateway. The router then forwards it toward the destination network according to its routing table.

## 7. Important Characteristics of Logical Addressing

- **Hierarchical:** IP addressing separates network prefixes from interface identifiers.
    
- **Configurable:** IP addresses can be assigned manually or through services such as DHCP.
    
- **Routable:** Routers use destination IP addresses and routing tables to forward packets.
    
- **Subnet-dependent:** The network and host portions are determined by the prefix length.
    
- **Protocol-based:** IP addressing operates within the TCP/IP networking architecture.
    

## Key Terms

- **Logical Address:** A network-layer address used to identify an interface in an IP network.
    
- **IP (Internet Protocol):** A protocol responsible for IP addressing and packet delivery across networks.
    
- **IPv4:** An IP version that uses 32-bit addresses.
    
- **Network ID:** The network-prefix portion of an IP address.
    
- **Host ID:** The host portion of an IP address within a subnet.
    
- **Subnet Mask:** A 32-bit value used with IPv4 to identify the network prefix.
    
- **CIDR Prefix:** The number of leading bits used for the network prefix, such as `/24`.
    
- **Default Gateway:** The router a host typically uses to reach destinations outside its local subnet.
    
- **Routing:** The process of selecting paths and forwarding packets between networks.
    
- **MAC Address:** A data-link address used for frame delivery on a local network.
    

## Summary

**Logical addressing** provides the hierarchical addressing system required for communication across interconnected networks. IP addresses identify source and destination interfaces, while subnet masks and prefix lengths determine network boundaries. Routers use destination IP addresses to forward packets between networks, making logical addressing a fundamental part of modern networking.

