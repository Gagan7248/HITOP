---
title: Fundamentals of Computer Networks
date: 2026-10-11
categories:
  - Tutorials
description: Learn a complete basics of computer network
thumbnail: images/basics-of-network.png
---
# Fundamentals of Computer Networks

## What is Computer Network?

A computer network is a group of components or other devices connected together to communicate, exchange data, and share resources such as files, printers, applications, and an internet connection.

**Example:** Computers connected to the same Wi-Fi network in an office can share files and access a common printer.
### Importance of network

- Easy sharing of files & information
- Sharing of expensive device like Servers, Printers

### Network components

- **End Devices:**  Computers, servers, printers, and smartphones.
- **Network devices:** Hub, Modem, Switch, Router, Repeater, Network Interface Card (NIC), Bridge, Wi-Fi Access Point, Firewall.
- **Transmission media:** Ethernet cables, fiber-optic cables, and Wireless.
- **Protocols:** TCP/IP, HTTP, FTP, DNS, SMTP and Telnet.

sample text


![Network Devices|533](<../../../images/network-devices.jpg>)
## Network Topology

Network topology is the physical or logical arrangement of computers, network devices, and communication links within a computer network.

In simple words, network topology describes how network devices are connected to each other and how data travels between them.

### Types of Network Topology

#### 1. Star Topology

All devices connect to a central switch or hub.

1. Easy to manage and troubleshoot.
2. A central device failure can affect the entire network.

![[Pasted image 20261019175609.png|194]]


**Example:** Office LAN.
#### 2. Bus Topology

All devices share one main backbone cable.

- Uses less cable.
- A backbone failure can disrupt the network.


![[Pasted image 20261019175911.png|247]]


**Example:** Older Ethernet networks.

#### 3. Ring Topology

1. Each device connects to two neighboring devices, forming a loop.

2. Data can travel around the ring.
- A single link failure may disrupt a basic, unprotected ring.

![[Pasted image 20261019180041.png|219]]

**Example:** Some legacy ring networks.

#### 4. Mesh Topology

Devices have multiple interconnections. In a full mesh, every device connects directly to every other device.

1. High redundancy and reliability.
2. Expensive and complex to implement.

![[Pasted image 20261019180935.png|226]]

**Example:** Redundant WAN connections.

#### 5. Tree Topology

Devices are arranged in a hierarchical structure with branches.

1. Easy to expand and organize.
2. Failure of an upper-level device can affect its branches.

![[Pasted image 20261019181126.png|280]]

**Example:** Enterprise campus network.

#### 6. Hybrid Topology

Combines two or more different topologies.

1. Flexible and scalable.
2. Design and troubleshooting can be more complex.

![[Pasted image 20261019181257.png|325]]

**Example:** A company combining star LANs with a redundant backbone.

### Physical Topology 

Physical topology refers to the actual physical arrangement of network devices, cables, ports, and other hardware components in a network.

In simple words, it describes how devices are physically connected to each other.

### Logical Topology

Logical topology refers to how data flows between devices across a network, regardless of the physical arrangement of the devices and cables.

In simple words, it describes how devices communicate and how data travels through the network.

## Network Types

### 1. LAN(Local Area Network)
A high-speed network confined to a small geographic area (e.g., office, building) using Ethernet (IEEE 802.3) or Wi-Fi (IEEE 802.11) for data transmission. Typically managed by a single organization.

### 2. WAN(Wide area Network)
A geographically distributed network that interconnects LANs over large distances using leased lines (e.g., MPLS, Metro Ethernet) or public networks (e.g., Internet with VPN tunneling). Security mechanisms such as IPSec or SSL/TLS are often implemented.

### 3. MAN(Metropolitan Area Network)
A network that spans a city or campus area, often owned by ISPs or large enterprises. Uses technologies like Ethernet MAN, DWDM, or microwave transmission.

### 4. Personal Area Network (PAN) 
A short-range network used for personal devices (e.g., smartphones, wearables) using Bluetooth, ZigBee, or USB interconnects.

### 5. Virtual Private Network (VPN)
A secure overlay network built over a public infrastructure (usually the Internet), providing encrypted tunnels (e.g., IPSec, SSL-VPN) for secure remote access.

## Communication Media

Communication media is the physical path or wireless medium through which data travels from one network device to another.

In simple words, communication media is the medium that carries data between devices in a network.

**Example** Connection of a computer to a switch using an Ethernet cable, the cable acts as the communication medium.

### Types of Communication Media

Communication media is divided into two main categories.

#### 1. Guided Media (Wired)

Data travels through a physical cable.

**Examples:** Twisted-pair cable, coaxial cable, fiber-optic cable.

#### 2. Unguided Media (Wireless)

Data travels through electromagnetic waves without a physical cable.

Examples: Wi-Fi, Bluetooth, cellular radio, satellite communication.


# Guided Media (Wired Communication)

##### A. Twisted Pair Cable (UTP/STP)

A cable containing pairs of insulated copper wires twisted together to reduce electromagnetic interference.

- **UTP:** Unshielded Twisted Pair
- **STP:** Shielded Twisted Pair
- Common categories: Cat5e, Cat6, Cat6A
- Common Ethernet channel length: up to 100 metres, depending on the standard and installation.

![[Pasted image 20261019183731.png|318]]

##### B. Coaxial Cable

A cable with a central conductor, insulation, metallic shielding, and an outer jacket.

- Good shielding against interference.
- Used in cable television and some broadband access networks.
- Less common for modern Ethernet LAN connections.

![[Pasted image 20261019184118.png|405]]


##### C. Fiber-Optic Cable

Transmits data using light pulses through glass or plastic fibers.

- Single-mode fiber (SMF): Common for long-distance links.
- Multimode fiber (MMF): Common for shorter links, such as within buildings and data centers.
- High bandwidth and immunity to electromagnetic interference.

![[Pasted image 20261019184231.png|293]]

#### 2. Unguided Media (Wireless Communication)




___

Data is transmitted through the air or vacuum using electromagnetic waves.

- **Radio Waves (Wi-Fi, LTE):**
    - Omni-directional, subject to interference and eavesdropping.
    - Requires encryption (e.g., WPA3, IPSec) for secure communication.
- **Microwave Transmission:**
    - Line-of-sight; used in point-to-point communication.
    - Prone to weather-related attenuation.
- **Infrared:**
    - Short-range, line-of-sight.
    - Common in remote controls and some sensor networks.
- **Satellite Communication:**
    - Long-distance, global coverage.
    - High latency, vulnerable to interception and weather.

---

# OSI Reference Model

The **OSI (Open Systems Interconnection) Model** is a **conceptual framework** developed by the ISO (International Organization for Standardization) that standardizes the functions of a telecommunication or computing system into **seven abstract layers**. It facilitates **interoperability**, **troubleshooting**, and **security implementation** across diverse systems and protocols by providing a common language and structure for network communication.

**1. Physical Layer:** Deals with the physical connection and transmission of raw binary data over a medium. Includes cables, switches, and network interface cards.

2. Data Link Layer: Manages node-to-node data transfer, error detection, and correction. Includes MAC addresses and switches.

**3. Network Layer:** Handles logical addressing and routing of data packets between networks. Includes IP addresses and routers.

**4. Transport Layer: Ensures reliable data transfer with error checking and flow control. Includes TCP and UDP protocols.**

**5. Session Layer:** Manages sessions or connections between applications. Controls dialogues and data exchange.

**6. Presentation Layer:** Translates data between the application layer and the network format. Handles encryption, decryption, and data compression.

**7.Application Layer:** **Provides network services directly to end-user applications. Includes protocols like HTTP, FTP, and SMTP.**

|Layer|Name|Function|Examples|Security Focus|
|---|---|---|---|---|
|**7**|Application|Interface for user applications|HTTP, FTP, SMTP, DNS|Input validation, authentication, app-layer firewalls|
|**6**|Presentation|Data formatting, encryption/decryption, compression|SSL/TLS, JPEG, ASCII, EBCDIC|Data encryption, encoding|
|**5**|Session|Establishes, manages, and terminates sessions|NetBIOS, RPC|Session tokens, timeout policies|
|**4**|Transport|Reliable delivery, segmentation, flow control|TCP, UDP|Port filtering, session hijacking protection|
|**3**|Network|Logical addressing and routing|IP, ICMP, OSPF|IP filtering, packet inspection, VPN tunneling|
|**2**|Data Link|Physical addressing (MAC), frame formatting|Ethernet, PPP, ARP|MAC filtering, VLANs, ARP spoofing prevention|
|**1**|Physical|Transmission of raw bits over media|Cables, hubs, modems|Physical security, tap detection|

---

# IP Addressing

**IP Address:** An **IP address (Internet Protocol address)** is a **unique numerical identifier** assigned to each device on a network that uses the **Internet Protocol for communication**.

It serves two critical purposes: **identification** (who the device is) and **location addressing** (where the device is in the network).

## **Types of IP Addresses**

1. **IPv4 (32-bit) :**

**Address Length**: 32 bits

**Address Format**: Dotted decimal (e.g., `192.168.0.1`)

**Total Addresses**: ~4.3 billion (2³²)

**Header Complexity**: Simpler, fewer fields

**Example Address**: `192.0.2.1`

**Deployment**: Widely used, but address exhaustion is an issue

**Security**: Relies on additional protocols (e.g., IPSec optional)

**NAT (Network Address Translation)**: Commonly used to extend address space

**2. IPv6 (128-bit)**

**Address Length**: 128 bits

**Address Format**: Hexadecimal, colon-separated (e.g., `2001:0db8:85a3::8a2e:0370:7334`)

**Total Addresses**: ~3.4×10³⁸ (2¹²⁸) — virtually unlimited

**Header Complexity**: More complex, but designed to be more efficient

**Example Address**: `2001:0db8:0000:0000:0000:ff00:0042:8329`

**Deployment**: Increasing adoption; solves address exhaustion

**Security**: IPSec support is mandatory

**NAT**: Typically not needed; end-to-end connectivity is preferred

## **5 Classes of IPv4 Address**

Class A : 1-126

Class B : 128-191

Class C : 192 – 223

Class D : 224 – 239 (Multicast)

Class E : 240 –255 (R&D)

**Class A**:

Range : 1.0.0.0 to 126.255.255.255

Default Subnet Mask: 255.0.0.0

CIDR Notation : /8

Octets : N.H.H.H

Network Bits : 8

Host Bits : 24

Available Address : 1,62,77,216

**Class B**:

Range : 128.0.0.0 to 191.255.255.255

Default Subnet Mask: 255.255.0.0

CIDR Notation : /16

Octets : N.N.H.H

Network Bits : 16

Host Bits : 16

Available Address : 65,361

**Class C**:

Range : 192.0.0.0 to 223.255.255.255

Default Subnet Mask: 255.255.255.0

CIDR Notation : /24

Octets : N.N.N.H

Network Bits : 24

Host Bits : 8

Available Address : 256

**Class D**: 224.0.0.0 to 239.255.255.255 (Multicast)

**Class E**: 240.0.0.0 to 255.255.255.255 (Reserved for future use, research)

## Public & Private IP Range

**Public IP Address :** A public IP address is a globally unique IP address assigned to a device that needs to be accessible over the internet. Public IP addresses are assigned by Internet Assigned Numbers Authority (IANA) and regional Internet registries (RIRs) like ARIN, RIPE NCC, APNIC, LACNIC, and AFRINIC.

**Usage**: Typically used for servers, websites, and any other devices that need to be reachable from the internet.

**Private IP Address**: A private IP address used within a private network, such as a home or corporate network. These addresses are not routable on the global internet and are used for internal communication within a local network. Private IP addresses typically connect to the internet through a Network Address Translation (NAT) device, which maps the private IP addresses to a public IP address.

**Usage**: Used for devices within a private network to communicate with each other without using public IP addresses.

**Range:**

- **Class A**: 10.0.0.0 to 10.255.255.255 (1 NETWORK)
- **Class B**: 172.16.0.0 to 172.31.255.255 (16 NETWORKS)
- **Class C**: 192.168.0.0 to 192.168.255.255 (256 NETWORKS)

### **Identity the Network & Host Part in IP Address :**

**Solution :** Find the class the address and the  divide the Network and Host Part according to Class:

|**Address**|**Class**|**N**|**H**|
|---|---|---|---|
|10.250.1.1|A|10|250.1.1|
|192.14.2.0|C|192.14.2|0|
|177.100.18.4|B|177.100|18.4|
|192.168.5.4|C|192.168.5|4|

### **How IP address are values denoted into classes:**

||**27**|**26**|**25**|**24**|**23**|**22**|**21**|**20**|**Obtained Range**|
|---|---|---|---|---|---|---|---|---|---|
||**128**|**64**|**32**|**16**|**8**|**4**|**2**|**1**||
|**Class A**|0|0|0|0|0|0|0|0|**0-127**|
|**Class B**|1|0|0|0|0|0|0|0|**128-191**|
|**Class C**|1|1|0|0|0|0|0|0|**192-223**|
|**Class D**|1|1|1|0|0|0|0|0|**224 - 239**|
|**Class E**|1|1|1|1|0|0|0|0|**240 - 255**|

### **Decimal to Binary Conversion & Binary to Decimal Conversion**

|**128**|**64**|**32**|**16**|**8**|**4**|**2**|**1**||
|---|---|---|---|---|---|---|---|---|
|1|1|1|1|1|1|1|1|**255**|
|0|1|1|0|1|1|1|1|**109**|
|0|0|1|0|0|1|0|0|**34**|
|0|0|1|1|0|1|1|1|**55**|
|0|1|0|0|0|1|0|0|**68**|

### **Converting a CIRD Notation or Slash value to Subnet mast follow the steps given below :**

Divide the Slash value from 8

Find how many time 8 dividing the slash value completely.

1 bit left – 128

2 bits left – 192

3 bits left – 224

4 bits left – 240

5 bits left – 248

6 bits left – 252

7 bits left – 254

### **Q.)** Find the Subnet masks of the following CIDR Values : /9, /10, /22, /30, /27.

**Ans**.

/9 - 255.128.0.0

/10 - 255.255.252.0

/30  255.255.255.252

/27 - 255.255.255.224

|**Power of 2**|**Value**|
|---|---|
|20|1|
|21|2|
|22|4|
|23|8|
|24|16|
|25|32|
|26|64|
|27|128|
|28|256|
|29|512|
|210|1,024|

---

# Class C Subnetting

**Q.) Required hosts – 40**

Ans.)

**If we take Class C network 192.168.10.0/24 for these required host.**

Total addresses in this network : 256

Total Usable host : 254

Required host 40

Wastage of IP : 254-40 = 214

**Note:** We are getting the maximum number of IP addresses, that's why we are doing the subnetting to avoid the wastage of IP addresses.

So follow the following steps

**Step 1**.Check Required Hosts covering in which block :

|20|1|
|---|---|
|21|2|
|22|4|
|23|8|
|24|16|
|25|32|
|26|64.|
|27|128|

40 is covering in block of 26

That means value of H will be =6

2H –2  = 40

26 - 2 = 40

64 –2 = 40

62=40

**Step 2 : find the Converted n/w Bits by its formula.**

**Converted n/w Bits** = Total host bits of this class of IP – required host bits.

N = 8-6

N =2

**Step 3: Find the total network bits by its formula.**

**Total n/w bits = Total n/w bits of this class of IP + converted n/w bits**

**=24+2**

**=26**

**255.255.255.X+X+X+X+X+X+X+X**

**255.255.255.128+64+0+0+0+0+0+0**

**255.255.255.192**

**Step 4: Convert the CIDR notation value to Subnet Mask.**

**/26 - 255.255.255.192**

**Now, we have the following network :-**

Subnet: 192.168.10.0/26

Subnet Mask : 255.255.255.192

Total IP Addresses: 64

Total Usable Address : 62

Wastage Addresses : 62-40 = 22

First usable Address : 192.168.10.1

Last Usable Address : 192.168.10.62

Network Address : 192.168.10.0

Broadcast Address : 192.168.10.63

**Q.) Finding the subnetwork and block size after subnetting :**

**Subnetworks = 2N**

**=22**

**=4**

**Now we can create 4 subnetworks of a  large network.**

**Block size = 2H**

**= 26**

**=64**

**1.) First Network :**

Subnet: 192.168.10.0/26

Subnet Mask : 255.255.255.192

Total IP Addresses: 64

Total Usable Address : 62

First usable Address : 192.168.10.1

Last Usable Address : 192.168.10.62

Network Address : 192.168.10.0

Broadcast Address : 192.168.10.63

**2.) Second Network :**

Subnet: 192.168.10.64/26

Subnet Mask : 255.255.255.192

Total IP Addresses: 64

Total Usable Address : 62

First usable Address : 192.168.10.65

Last Usable Address : 192.168.10.126

Network Address : 192.168.10.64

Broadcast Address : 192.168.10.127

**3.) Third Network**

Subnet: 192.168.10.128/26

Subnet Mask : 255.255.255.192

Total IP Addresses: 64

Total Usable Address : 62

First usable Address : 192.168.10.129

Last Usable Address : 192.168.10.190

Network Address : 192.168.10.128

Broadcast Address : 192.168.10.191

**4.) Fourth Network :**

Subnet: 192.168.10.192/26

Subnet Mask : 255.255.255.192

Total IP Addresses: 64

Total Usable Address : 62

First usable Address : 192.168.10.193

Last Usable Address : 192.168.10.254

Network Address : 192.168.10.192

Broadcast Address : 192.168.10.255

---

# **Class B Subnetting**

**1. Required Hosts – 700**

**Step 1 :** Find required host value in power of 2.

210  = 1024

H = 10

2H -2  = 700

210 - 2 =  700

1024 - 2 = 700

**Step 2 : Find the converted network bits.**

**Converted network bits(N)**  =     Total host bits of this class – required host bits

N     =    16-10

N     =    6

**Step 3: Find the total network bits.**

**Total n/w bits   =   Total n/w bits of this class of IP + converted n/w bits**

**=   16 + 6**

**=   22**

**CIDR Value = /22**

**Step 4: Convert the CIDR notation value to Subnet Mask.**

**Left bits = 6**

**/22 = 255.255.(128+64+32+16+8+4+0+0).0**

**Subnet Mask = 255.255.252.0**

**Step 5 : Subnet Summery**

Subnet:

Subnet Mask :

Total IP Addresses:

Total Usable Address :

Wastage Addresses :

First usable Address :

Last Usable Address :

Network Address :

Broadcast Address :

---

# DHCP

### Purpose:

- DHCP automates the process of assigning IP addresses, subnet masks, default gateways, and other network configuration parameters to devices on a network.
- It Provides administrators with a mechanism to dynamically allocate IP addresses, rather than manually setting the address on each device.

### Components:

**1. DHCP Server:** Manages a pool of IP addresses and configuration information. Assigns IP addresses and other settings to DHCP clients.  
**2. DHCP Client:** A device requesting network configuration information from a DHCP server.  
**3. DHCP Relay Agent:** Forwards DHCP messages between clients and servers when they are on different subnets.

### **Process (DORA): Types of message—**

There are four steps to this DHCP process :

**1. Discover:** Client broadcasts a DHCP Discover message to find available DHCP servers in local segment.  
**2. Offer:** DHCP server responds with a DHCP Offer message, including an IP address and configuration parameters.  
**3. Request:** Client sends a DHCP Request message to the selected DHCP server, requesting the offered IP address.  
**4. Acknowledge:** DHCP server sends a DHCP Acknowledgment message, confirming the IP address assignment and providing configuration details.

### DHCP Lease time :

- **IP Address Lease:** DHCP servers assign IP addresses with a lease time. When the lease expires, the client must renew it.
- **Lease Renewal:** Clients can request to renew their IP lease before it expires, ensuring continuity of service.
- **Lease Rebinding:** If the original DHCP server is unreachable, the client may attempt to contact any available DHCP server for lease renewal.

### Configuration offered by DHCP Server :

In addition to IP address and subnet mask information, DHCP can provide the following protocol parameters:

- Default Gateway
- Domain Name
- DNS servers
- Time Servers
- WINS servers

### Benefits:

- **Centralized Management:** Simplifies IP address management and configuration.
- **Reduced Manual Configuration:** Minimizes the need for manual IP address assignments.
- **Dynamic Allocation:** Efficiently manages IP address allocation and reuse.

### Security Considerations:

- **Unauthorized DHCP Servers:** Risk of rogue DHCP servers assigning incorrect settings. Use DHCP snooping to mitigate this risk.
- **IP Address Conflicts:** Ensure proper configuration to avoid conflicts between statically and dynamically assigned addresses.

### Port Number:

- DHCP Client broadcast the DHCP discover message on port **67.**
- DHCP Server send the DHCP offer message port **68**.

---

# DHCP Relay

### **Purpose:**

- DHCP Relay allows DHCP clients on different subnets to communicate with a DHCP server that is not on the same local subnet.
    
- This is essential in larger networks where a central DHCP server is used to manage IP address distribution across multiple subnets.
    
- **DHCP Relay Agent:** A network device (usually a router or a switch) configured to forward DHCP requests and replies between clients and the DHCP server across different subnets.
    
- **Forwarding Mechanism:** The relay agent listens for DHCP messages on its local interfaces and forwards them to the DHCP server's IP address.
    

### **How DHCP Relay Works:**

- **DHCP Discover Message:** A DHCP client broadcasts a DHCP Discover message on its local subnet.Relay
- **Agent Action:** The relay agent intercepts this broadcast message and forwards it to the DHCP server, using unicast server.
- **Response:** The DHCP server receives the message, processes it, and sends a DHCP Offer message back to the relay agent.
- **Relay Agent Forwarding:** The relay agent receives the DHCP Offer and forwards it back to the client.
- **Client Request and Acknowledgment:** The client then sends a DHCP Request message, and the server responds with a DHCP Acknowledgment, both of which are relayed by the DHCP relay agent.

---

# NAT Overload

NAT overload, also known as Port Address Translation (PAT) is a type of NAT that **allows multiple devices on a local network to share a single public IP address when accessing the internet**. This is achieved by translating private IP addresses and different port numbers to the public IP address.

When a device on the local network (with a private IP address) sends a request to the internet, the router or firewall translates the private IP and port number to the single public IP address. The router or firewall uses different port numbers for each device to distinguish between the connections.

**Benefits:**

**Conserves public IP addresses:** It allows multiple devices to use a single public IP address, reducing the need for multiple public IP addresses.

**Improved security:** Hides internal network addresses from the internet, enhancing security.

**Limitations:**

**Potential performance issues:** Can sometimes slow down performance, especially with multiple concurrent connections.

**Can break end-to-end connectivity:** Can make it difficult for external devices to directly connect to specific devices within the private network.

**Compatibility issues with some applications:** Some applications that rely on specific port numbers or require direct connections may not function correctly.

---

# NAT

### **NAT(Network Address Translation):**

- Modify network address information in packet headers while they are in transit, which helps to map one IP address space into another.
- NAT is commonly used to enable multiple devices on a local network to share a single public IP address.
- Translate between private and public addresses
- Translate multiple privately-addressed hosts to a single public address, which conserves the public address space.
- Hiding the specific addresses and addressing structure of the internal (or private) network.
- Public-to-public address translation, as well as private-to-private address translation.
- Temporarily solution to the address shortage problem. IPv4 will eventually be replaced with IPv6

### Types of NAT :

**Static NAT:**

- One-to-one translation between two addresses, or between a port on one address to a port on another address.
- Maps one private IP address to one public IP address.
- Often used to assign a public address to a device behind a NAT-enabled firewall/router.
- Typically used for web servers or other devices that need to be accessible from outside the network.

**Dynamic NAT:**

- Utilizes a pool of global addresses to dynamically translate the outbound traffic of clients behind a NAT-enabled device.

### **NAT Overload or Port Address Translation (PAT) :**

- Translates the outbound traffic of clients to unique port numbers off of a single global address.
- PAT is necessary when the number of internal clients exceeds the available global addresses.

### NAT Terminology :

- **Inside Local**: The specific IP address assigned  
    to an inside host behind a NAT-enabled device (usually a private address).
- **Inside Global:** the address that identifies an  
    inside host to the outside world (usually a public address). Essentially, this  
    is the dynamically or statically-assigned public address assigned to a private  
    host.
- **Outside Global:** the address assigned to an  
    outside host (usually a public address).
- **Outside Local:** the address that identifies an  
    outside host to the inside network. Often, this is the same address as the  
    Outside Global. However, it is occasionally necessary to translate an outside  
    (usually public) address to an inside (usually private) address.

---

# DNS

Domain Name System (DNS) is a critical service that translates domain names (like [www.google.com](http://www.google.com/)) into IP addresses (like 209.85.225.104). This translation is essential for connecting to resources on the Internet and within private networks.

### **Purpose of DNS:**

- DNS alleviates the need to remember numerical IP addresses by allowing users to use alphanumeric domain names.
- It operates as a distributed hierarchical system, with servers responsible for different parts of the DNS namespace.

### **Components of DNS:**

- **Hierarchy:** DNS is structured hierarchically, from top-level domains (TLDs) like .com, to second-level domains (e.g., .google), and finally to hostnames (e.g., www).
- **DNS Servers:**
    - **Primary (Master) DNS Server:** This server holds the original, authoritative copies of DNS records (zone files) for a domain. It manages updates to these records.
    - **Secondary (Slave) DNS Server:** This server maintains a copy of the primary server's zone files. It can answer queries if the primary server is unavailable and can also forward updates to the primary server.
    - **Caching DNS Server:** These servers do not store zone files but temporarily store (cache) resolved
    - **DNS queries.** They improve performance by reducing the need to query authoritative DNS servers repeatedly for the same information.

### **Implementation and Configuration:**

- **HOSTS Files:** These are local static files that can be configured on each device. They contain specific mappings of hostnames to IP addresses. Updates require manual changes on each device.
- **Centralized DNS Servers:** Preferred in larger networks, all devices point to one or more DNS servers. Changes need to be made only on these servers, simplifying administration.

### **Advantages of DNS over HOSTS Files**

- **Centralized Management**: Changes are made once on DNS servers rather than on every device.
- **Scalability**: Handles large volumes of DNS queries efficiently.
- **Redundancy and Load Balancing**: DNS can distribute queries across multiple servers for fault tolerance and load balancing.

---

### Cabling & Connectors

**Cabling and Connectors** are the physical media  
and interfaces used to connect devices within a network, enabling data  
transmission.

1. **Ethernet Standards**

Ethernet standards  
define the wiring and signaling for physical connections in a network. These  
standards include different speeds, transmission methods, and media types.

**a. 10BASE-T**

- **Speed:** 10 Mbps (Megabits per second)
- **Cabling:** Twisted-pair copper cable (Cat3 or higher)
- **Distance:** Maximum of 100 meters per segment
- **Connector:** RJ45
- **Usage:** Early Ethernet networks, typically found in older infrastructure.

**b. 100BASE-TX**

- **Speed:** 100 Mbps
- **Cabling:** Twisted-pair copper cable (Cat5 or higher)
- **Distance:** Maximum of 100 meters per segment
- **Connector:** RJ45
- **Usage:** Common in small and medium-sized networks during the late 1990s and 2000s, still in use in some legacy systems.

**c. 1000BASE-T**

- **Speed:** 1 Gbps (Gigabit per second)
- **Cabling:** Twisted-pair copper cable (Cat5e or Cat6)
- **Distance:** Maximum of 100 meters per segment
- **Connector:** RJ45
- **Usage:** Widely used in modern networks, including offices and data centers.

**d. 10GBASE-T**

- **Speed:** 10 Gbps
- **Cabling:** Twisted-pair copper cable (Cat6a or Cat7)
- **Distance:** Maximum of 100 meters per segment (Cat6a) or shorter distances for lower category cables
- **Connector:** RJ45
- **Usage:** High-speed network backbones, data centers, and environments requiring fast data transfer rates.

**2. Fiber Optics**

Fiber optic cables  
use light to transmit data, offering higher speeds and longer distances than  
copper cables. They are used in environments where high bandwidth,  
long-distance transmission, and resistance to electromagnetic interference  
(EMI) are required.

**a. Single-Mode Fiber (SMF)**

- **Core Diameter:** Small core (typically 8-10 microns)
- **Light Source:** Laser
- **Distance:** Long distances, up to 40 km or more without the need for repeaters
- **Usage:** Long-haul networks, metropolitan area networks (MANs), and high-speed data transmission over long distances.

**b. Multi-Mode Fiber (MMF)**

- **Core Diameter:** Larger core (typically 50-62.5 microns)
- **Light Source:** LED or laser
- **Distance:** Shorter distances, up to 550 meters for 10 Gbps
- **Usage:** Shorter-distance applications like LANs, data centers, and within buildings.

**3. Connectors**

Various connectors  
are used with copper and fiber optic cables to interface with network devices.

**a. RJ45**

- **Usage:** The most common connector for twisted-pair Ethernet cables (Cat5, Cat6, etc.).
- **Features:** 8 pins, supports various Ethernet standards from 10BASE-T to 10GBASE-T.

**b. LC (Lucent Connector)**

- **Usage:** Commonly used with fiber optic cables, particularly in high-density patch panels.
- **Features:** Smaller form factor, easy to use, with a push-pull latching mechanism.

**c. SC (Subscriber Connector or Standard Connector)**

- **Usage:** Used in fiber optic networks, known for its square shape.
- **Features:** Push-pull design, widely used in network environments, especially for single-mode fiber.

**d. ST (Straight Tip)**

- **Usage:** Older fiber optic connector, commonly found in legacy systems.
- **Features:** Bayonet-style connector, often used in multi-mode networks.

**e. MTP/MPO (Multi-fiber Push On)**

- **Usage:** Used in environments requiring high fiber count, like data centers.
- **Features:** Connects multiple fibers (12, 24, or more) in a single connector, allowing for higher-density connections.

---

# VLAN

_Virtual LAN (VLAN)_ is a concept in which we can divide the devices logically on layer 2 (data link layer). Generally, layer 3 devices divide the broadcast domain but the broadcast domain can be divided by switches using the concept of VLAN.

**Broadcast Domain:**

A broadcast domain is a network segment in which if a device broadcast a packet then all the devices in the same broadcast domain will receive it. The devices in the same broadcast domain will receive all the broadcast packets but it is limited to switches only as routers don’t forward out the broadcast packet.

### VLANs offer several features and benefits, including:

- **Improved network security:** VLANs can be used to separate network traffic and limit access to specific network resources. This improves security by preventing unauthorized access to sensitive data and network resources.
- **Better network performance:** By segregating network traffic into smaller logical networks, VLANs can reduce the amount of broadcast traffic and improve network performance.
- **Simplified network management:** VLANs allow network administrators to group devices together logically, rather than physically, which can simplify network management tasks such as configuration, troubleshooting, and maintenance.
- **Flexibility:** VLANs can be configured dynamically, allowing network administrators to quickly and easily adjust network configurations as needed.
- **Cost savings:** VLANs can help reduce hardware costs by allowing multiple virtual networks to share a single physical network infrastructure.
- **Scalability:** VLANs can be used to segment a network into smaller, more manageable groups as the network grows in size and complexity.

• **VLAN tagging:** VLAN tagging is a way to identify and distinguish VLAN traffic from other network traffic. This is typically done by adding a VLAN tag to the Ethernet frame header.

**VLAN trunking:** VLAN trunking allows multiple VLANs to be carried over a single physical link. This is typically done using a protocol such as IEEE 802.1Q

Access Port : Connecting to end devices (host or Router). Part of VLAN

Trunk Port : Do not belong to any VLAN. Carry Multiple VLAN Traffic. Link Between Two Switches. Also called Frame tagging.

![image.png](attachment:1457d519-7679-427e-9055-c87a0d73fb0a:image.png)

- VLANs is a switch-only feature. It works only on manageable Ethernet switches.
- VLANs are used to create boundaries for broadcast messages.
- VLANs do not share broadcast messages.
- Devices in different VLANs cannot communicate directly. They can communicate through a router.
- You can create and use the same VLAN on multiple routers. This feature allows you to arrange devices logically.
- All switches have a default VLAN, called VLAN1.
- By default, all switch ports belong to VLAN1.

---

# Ethernet Technology

What is Ethernet?

Ethernet is a family of technologies that provides data-link and physical specifications for controlling access to a shared network medium. It has emerged as the dominant technology used in LAN networking.

Ethernet was originally developed by Xerox in the 1970s, and operated at 2.94Mbps. The technology was standardized as Ethernet Version 1 by a consortium of three companies - DEC, Intel, and Xerox, collectively referred to as DIX - and further refined as Ethernet II in 1982.

In the mid-1980s, the Institute of Electrical and Electronic Engineers (IEEE) published a formal standard for Ethernet, defined as the IEEE 802.3 standard. The original 802.3 Ethernet operated at 10Mbps, and successfully supplanted competing LAN technologies, such as Token Ring.

Ethernet has several benefits over other LAN technologies:

- Simple to install and manage
- Inexpensive
- Flexible and scalable
- Easy to interoperate between vendors

Ethernet Cabling Types

Ethernet can be deployed over three types of cabling:

- Coaxial cabling – almost entirely deprecated in Ethernet networking
- Twisted-pair cabling
- Fiber optic cabling

_Coaxial Cable_

Coaxial cable, often abbreviated as coax, consists of a single copper wire surrounded by insulation, a metallic shield, and a plastic sheath. The shield helps protect against electromagnetic interference (EMI), which can cause attenuation, a reduction of the strength and quality of a signal. EMI can be generated by a variety of sources, such as florescent light ballasts, microwaves, cell phones, and radio transmitters.

Coax is commonly used to deploy cable television to homes and businesses.

_Twisted Pair Cable_

Twisted-pair cable consists of two or four pairs of copper wires in a plastic sheath. Wires in a pair twist around each other to reduce crosstalk, a form of EMI that occurs when the signal from one wire bleeds or interferes with a signal on another wire. Twisted-pair is the most common Ethernet cable.

Twisted-pair cabling can be either shielded or unshielded. Shielded twisted pair is more resistant to external EMI; however, all forms of twisted-pair suffer from greater signal attenuation than coax cable.

There are several categories of twisted-pair cable, identified by the number of twists per inch of the copper pairs:

- Category 3 or Cat3 - three twists per inch.
- Cat5 - five twists per inch.
- Cat5e - five twists per inch; pairs are also twisted around each other.
- Cat6 – six twists per inch, with improved insulation.

_Fiber Optics Cable_

While coax and twisted-pair cabling carry electronic signals, fiber optics uses light to transmit a signal.

Ethernet supports two fiber specifications:

**1. Single mode fiber – consists of a very small glass core, allowing only a single ray or mode of light to travel across it. This greatly reduces the attenuation and dispersion of the light signal, supporting high bandwidth over very long distances, often measured in kilometers.  
2. Multimode fiber – consists of a larger core, allowing multiple modes of light to traverse it. Multimode suffers from greater dispersion than single mode, resulting in shorter supported distances.**

- **Single mode fiber** – consists of a very small glass core, allowing only a single ray or mode of light to travel across it. This greatly reduces the attenuation and dispersion of the light signal, supporting high bandwidth over very long distances, often measured in kilometers.
- **Multimode fiber** – consists of a larger core, allowing multiple modes of light to traverse it. Multimode suffers from greater dispersion than single mode, resulting in shorter supported distances.

Single mode fiber requires more precise electronics than multimode, and thus is significantly more expensive. Multimode fiber is often used for high-speed connectivity within a datacenter.

The Ethernet Frame

An Ethernet frame contains the following fields:

|**Field**|**Length**|**Description**|
|---|---|---|
|Preamble|7 bytes|Synchronizes communication|
|Start of Frame|1 byte|Signals the start of a valid frame|
|MAC Destination|6 bytes|Destination MAC address|
|MAC Source|6 bytes|Source MAC address|
|802.1Q tag|4 bytes|Optional VLAN tag|
|Ethertype or length|2 bytes|Payload type or frame size|
|Payload|42-1500 bytes|Data payload|
|CRC|4 bytes|Frame error check|
|Interframe Gap|12 bytes|Required idle period between frames|

- **Preamble (7 bytes)**: The preamble consists of a sequence of alternating 1s and 0s used to synchronize communication between the sending and receiving devices.
- **Start of Frame Delimiter (1 byte)**: This byte signals the start of a valid Ethernet frame, marking the boundary between the preamble and the frame data.
- **MAC Destination (6 bytes)**: The destination MAC address is the hardware address of the receiving device.
- **MAC Source (6 bytes)**: The source MAC address is the hardware address of the sending device.
- **802.1Q tag (4 bytes)**: This optional field is used when VLAN tagging is required. It includes information about the VLAN ID and priority.
- **Ethertype or Length (2 bytes)**: This field either indicates the type of protocol encapsulated in the payload (e.g., IPv4, IPv6) or the length of the payload, depending on the frame type.
- **Payload (42-1500 bytes)**: The actual data being transported in the frame. The size can vary, but it typically ranges from 42 to 1500 bytes.
- **CRC (4 bytes)**: The Cyclic Redundancy Check (CRC) is used for error detection. It allows the receiving device to verify the integrity of the frame.
- **Interframe Gap (12 bytes)**: This is a required idle period between frames, allowing devices time to process the frame before the next one is sent.

CSMA/CD and Half-Duplex Communication

There are two methods of communication on a shared physical medium:

**Half-Duplex** – hosts can transmit or receive, but not simultaneously

**Full-Duplex** – hosts can both transmit and receive simultaneously

Ethernet in half-duplex mode uses the **Carrier Sense Multiple Access with Collision Detection (CSMA/CD)** protocol to manage communication between devices on a shared network medium. Here's how it works:

- **Carrier Sense:** Before transmitting data, a device checks the network to ensure the medium is idle. If another device is already transmitting, the device waits until the medium is free.
- **Multiple Access:** Multiple devices share the same network medium. Each device has the opportunity to transmit data, but only one device can do so at a time.
- **Collision Detection:** If two devices transmit data simultaneously, a collision occurs, resulting in unreadable data. Both devices detect the collision and stop transmitting.
- **Collision Handling:** After a collision, both devices send a 32-bit jam sequence to notify all devices on the network. They then wait for a random backoff time before attempting to retransmit, reducing the chance of another collision.
- **Slot Time:** The slot time is the maximum duration within which a collision must be detected. For 10 and 100 Mbps Ethernet, the slot time is 512 bits (64 bytes), equivalent to the minimum frame size. For Gigabit Ethernet, the slot time is extended to 4096 bits.
- **Late Collisions:** If a collision is detected after the slot time, it is called a late collision, typically indicating an issue with network length or configuration.

Full-Duplex Communication

Unlike half-duplex, full-duplex Ethernet supports simultaneously communication by providing separate transmit and receive paths. This effectively doubles the throughput of a network interface.

Full-duplex Ethernet was formalized in IEEE 802.3x, and does not use CSMA/CD or slot times. Collisions should never occur on a functional full duplex link. Greater distances are supported when using full-duplex over half-duplex.

Full-duplex is only supported on a point-to-point connection between two devices. Thus, a bus topology using coax cable does not support full-duplex. Only a connection between two hosts or between a host and a switch supports full-duplex. A host connected to a hub is limited to half-duplex. Both hubs and half-duplex communication are mostly deprecated in modern networks.

Categories of Ethernet

Ethernet standards, identified by numbers and letters (e.g., 802.3u, 802.3z), have evolved to support faster speeds, longer distances, and newer hardware.

**Speed Categories**

Ethernet: 10 Mbps

Fast Ethernet: 100 Mbps

Gigabit Ethernet: 1 Gbps

10 Gigabit Ethernet: 10 Gbps

**Physical Standards**

**Labeling:** E.g., 100baseT:

100: Transmission rate in Mbps

Base: Baseband transmission (single channel)

T - Media type (Twisted-pair)

**Transmission:**

Baseband: Single signal/channel per medium

Broadband: Multiple signals/channels via modulation

Ethernet(10 Mbps)

- Originally referred to the 802.3 standard (10 Mbps).
- Supports **coax**, **twisted-pair**, and **fiber** cabling.
- **Twisted-pair Ethernet** uses two of the four pairs.

**Common Ethernet Physical Standards**:

|**IEEE Standard**|**Physical Standard**|**Cable Type**|**Max Speed**|**Max Length**|
|---|---|---|---|---|
|**802.3a**|**10base2**|Coaxial (thinnet)|10 Mbps|185 meters|
|**802.3**|**10base5**|Coaxial (thicknet)|10 Mbps|500 meters|
|**802.3i**|**10baseT**|Twisted-pair|10 Mbps|100 meters|
|**802.3j**|**10baseF**|Fiber|10 Mbps|2000 meters|

**Full-Duplex**:

- **10baseT** and **10baseF** support full-duplex, doubling bandwidth to **20 Mbps**.
- Full-duplex is supported in **point-to-point** connections (e.g., between two hosts or a host and a switch).

**Extending Ethernet Distance**:

- **Repeater**, **hub**, or **switch** can extend the maximum segment distance.

Fast Ethernet (100 Mbps)

- **EEE 802.3u (1995)**: Introduced **Fast Ethernet** at 100 Mbps.
- Supports **twisted-pair copper** and **fiber** cabling.
- Operates in **half-duplex** and **full-duplex** modes.

**Common Fast Ethernet Physical Standards**:

|**IEEE Standard**|**Physical Standard**|**Cable Type**|**Max Speed**|**Max Length**|
|---|---|---|---|---|
|**802.3u**|**100baseTX**|Twisted-pair|100 Mbps|100 meters|
|**802.3u**|**100baseT4**|Twisted-pair|100 Mbps|100 meters|
|**802.3u**|**100baseFX**|Multimode fiber|100 Mbps|400-2000 meters|
|**802.3u**|**100baseSX**|Multimode fiber|100 Mbps|500 meters|

- **100baseT4**: Not widely implemented; supports only half-duplex.
- **100baseTX**: Dominant standard; uses two pairs in twisted-pair cables and requires **Category 5** cable for reliability.

Speed and Duplex Auto negotiation

**Compatibility**:

Fast Ethernet (100 Mbps) is backward-compatible with the original Ethernet (10 Mbps). Devices supporting both are known as 10/100 devices.

**Autonegotiation**:

Fast Ethernet introduced autonegotiation to automatically select the best speed and duplex mode (full or half). Both sides of a connection must either autonegotiate or be hardcoded with identical settings to avoid duplex mismatches, which can cause severe performance issues.

**Configuration Issues**:

A duplex mismatch occurs if one side autonegotiates and the other is hardcoded, often leading to slow network performance due to collisions. Historically, early autonegotiation had standardization problems, leading to mistrust.

**Current Best Practices**:

Modern devices handle autonegotiation more reliably, but many administrators still prefer hardcoding settings, especially for servers. Gigabit Ethernet improved autonegotiation and generally recommends it as a best practice.

Gigabit Ethernet

Gigabit Ethernet operates at 1000 Mbps, and supports both twisted-pair (802.3ab) and fiber cabling (802.3z). Gigabit over twisted-pair uses all four pairs, and requires Category 5e cable for reliable performance.

Gigabit Ethernet is backwards-compatible with the original Ethernet and Fast Ethernet. A device that supports all three is often referred to as a 10/100/1000 device. Gigabit Ethernet supports both half-duplex or full duplex operation. Full-duplex Gigabit Ethernet effectively provides 2000 Mbps of throughput.

|**IEEE Standard**|**Physical Standard**|**Cable Type**|**Speed**|**Maximum Cable Length**|
|---|---|---|---|---|
|802.3ab|1000baseT|Twisted-pair|1 Gbps|100 meters|
|802.3z|1000baseSX|Multimode fiber|1 Gbps|500 meters|
|802.3z|1000baseLX|Multimode fiber|1 Gbps|500 meters|
|802.3z|1000baseLX|Singlemode fiber|1 Gbps|Several kilometers|

10 Gigabit Ethernet

10 Gigabit Ethernet operates at 10000 Mbps, and supports both twisted-pair (802.3an) and fiber cabling (802.3ae). 10 Gigabit over twisted-pair uses all four pairs, and requires Category 6 cable for reliable performance.

|**IEEE Standard**|**Physical Standard**|**Cable Type**|**Speed**|**Maximum Cable Length**|
|---|---|---|---|---|
|802.3an|10Gbase-T|Twisted-pair|10 Gbps|100 meters|
|802.3ae|10Gbase-SR|Multimode fiber|10 Gbps|300 meters|
|802.3ae|10Gbase-LR|Single mode fiber|10 Gbps|Several kilometers|

10 Gigabit Ethernet is usually used for high-speed connectivity within a datacenter, and is predominantly deployed over fiber.

Twisted-Pair Cabling Overview

A typical twisted-pair cable consists of four pairs of copper wires, for a total of eight wires. Each side of the cable is terminated using an RJ45 connector, which has eight pins. When the connector is crimped onto the cable, these pins make contact with each wire.

---

# Wireless Concept

**Wireless Concepts** are essential for understanding how wireless networks operate, including the transmission of  
data, network identification, security, and the standards that govern wireless  
communication.

**1. RF (Radio Frequency)**

- **Function:** Radio Frequency refers to the electromagnetic waves used to transmit data over wireless networks. RF is the core technology behind wireless communication, allowing devices to send and receive signals without physical connections.
- **Frequency Bands:**
    - **2.4 GHz Band:** Offers wider coverage but is more prone to interference from other devices like microwaves and Bluetooth. Supports 802.11b/g/n standards.
    - **5 GHz Band:** Provides faster speeds and less interference but with a shorter range. Supports 802.11a/n/ac/ax standards.
- **Channel:** RF spectrum is divided into channels. Proper channel selection can minimize interference and optimize performance.
- **Signal Strength and Quality:**
    - **RSSI (Received Signal Strength Indicator):** Measures the power level of a received signal.
    - **SNR (Signal-to-Noise Ratio):** The difference between the signal strength and background noise; higher SNR means better quality.

**2. SSID (Service Set Identifier)**

- **Function:** SSID is the name assigned to a wireless network. It helps users identify and connect to a specific network, especially in environments with multiple networks available.
- **Broadcasting:**
    - **Enabled (Default):** The SSID is broadcasted, allowing devices to easily find and connect to the network.
    - **Disabled:** The SSID is hidden, requiring users to manually enter the network name to connect, which adds a layer of security.
- **Use Cases:** In home and business networks, the SSID distinguishes one wireless network from another, making it easier for users to connect to the correct network.

**3. Encryption**

Encryption is  
critical for securing wireless networks by protecting the data transmitted  
between devices from being intercepted or tampered with. There are several  
encryption standards:

**a. WEP (Wired Equivalent Privacy)**

- **Security Level:** Low
- **Encryption:** 40-bit or 104-bit key
- **Vulnerabilities:** WEP is considered insecure due to flaws that make it easily crackable.
- **Use Cases:** Legacy systems; not recommended for modern networks.

**b. WPA (Wi-Fi Protected Access)**

- **Security Level:** Medium
- **Encryption:** TKIP (Temporal Key Integrity Protocol)
- **Improvements Over WEP:** Dynamic key generation and integrity checking, but still vulnerable to certain attacks.
- **Use Cases:** Transitional standard; better than WEP but largely replaced by WPA2.

**c. WPA2 (Wi-Fi Protected Access 2)**

- **Security Level:** High
- **Encryption:** AES (Advanced Encryption Standard), which is more secure than TKIP.
- **Security Modes:**
    - **Personal Mode (WPA2-PSK):** Uses a pre-shared key, suitable for home and small business networks.
    - **Enterprise Mode (WPA2-EAP):** Uses an authentication server (RADIUS), suitable for larger organizations requiring stronger security.
- **Use Cases:** The most common and recommended standard for securing modern wireless networks.

**d. WPA3**

- **Security Level:** Very High
- **Encryption:** Improved encryption methods over WPA2, including better protection against brute-force attacks and enhanced security for public networks.
- **Use Cases:** Emerging standard for future-proofing wireless networks with stronger security.

**4. Wireless Standards (802.11)**

Wireless standards  
are defined by the IEEE 802.11 family, specifying the protocols for wireless  
local area networks (WLANs).

**a. 802.11a(1999)**

- **Speed:** Up to 54 Mbps
- **Frequency:** 5 GHz
- **Range:** Shorter range, less interference
- **Use Cases:** Early adoption in corporate environments, now largely obsolete.

**b. 802.11b**

- **Speed:** Up to 11 Mbps
- **Frequency:** 2.4 GHz
- **Range:** Wider range but susceptible to interference
- **Use Cases:** Early home and small business networks; now outdated.

**c. 802.11g**

- **Speed:** Up to 54 Mbps
- **Frequency:** 2.4 GHz
- **Backward Compatibility:** Compatible with 802.11b
- **Use Cases:** Common in home and small business networks during the early 2000s.

**d. 802.11n**

- **Speed:** Up to 600 Mbps (depending on configuration)
- **Frequency:** 2.4 GHz and 5 GHz (dual-band)
- **Technology:** MIMO (Multiple Input, Multiple Output) for better performance and range
- **Use Cases:** Widely used in both home and enterprise networks, offering better performance and range.

**e. 802.11ac**

- **Speed:** Up to 1.3 Gbps or higher
- **Frequency:** 5 GHz
- **Technology:** Advanced MIMO, wider channels (up to 160 MHz), and beamforming for improved speed and reliability
- **Use Cases:** Modern networks requiring high-speed wireless connections, such as streaming HD content and gaming.

**f. 802.11ax (Wi-Fi 6)**

- **Speed:** Up to 9.6 Gbps
- **Frequency:** 2.4 GHz and 5 GHz (dual-band, with potential for 6 GHz in Wi-Fi 6E)
- **Technology:** OFDMA (Orthogonal Frequency Division Multiple Access), MU-MIMO, better efficiency in crowded environments
- **Use Cases:** Next-generation networks, ideal for environments with many connected devices (IoT, smart homes, offices).

**802.11be (Wi-Fi 7) (Upcoming, expected around  
2024)**

- **802.11be (Wi-Fi 7) (Upcoming, expected around 2024)**
- Frequency: 2.4 GHz, 5 GHz, and 6 GHzMax
- Speed: Expected up to 46 Gbps
- Range: Focus on high efficiency and lower latency, suitable for high-density environments

**1.) 802.11a (1999)**

Frequency: 5 GHzMax

Speed: 54 Mbps

Range: Shorter range compared to 2.4  
GHz standards

2**.) 802.11b (1999)**

**Frequency**: 2.4 GHzMax  
Speed: 11 Mbps

Range: Longer range, but more  
interference due to many devices using 2.4 GHz

**3.) 802.11g (2003)**

Frequency: 2.4 GHzMax

Speed: 54 Mbps

Range: Similar to 802.11b but with  
higher speed

**4.) 802.11n - Wi-Fi 4(2009)**

Frequency: 2.4 GHz and 5 GHz  
(dual-band)Max Speed: 600  
Mbps

Range: Improved range and speed due to  
MIMO (Multiple Input Multiple Output) technology

**5.) 802.11ac- Wi-Fi 5(2013)**

Frequency: 5 GHzMax

Speed: Up to 1.3 Gbps

Range: Better performance at 5 GHz,  
wider channels, and more MIMO streams

**6.) 802.11ad (2016)**

Frequency: 60 GHz

Max Speed: Up to 7 Gbps

Range: Very short range, mainly used  
for specific high-speed applications

**7.) 802.11ax (Wi-Fi 6) (2019)**

Frequency: 2.4 GHz and 5 GHz

Max Speed**:** Up to 9.6 Gbps

Range: Improved efficiency, capacity,  
and performance in dense environments

**8.) 802.11ax (Wi-Fi 6E) (2020)**

Frequency: 2.4 GHz, 5 GHz, and 6  
GHzMax Speed: Up to 9.6  
Gbps

Range: Improved efficiency and  
capacity, access to 6 GHz band, lower latency

**9.) 802.11ay (2021)**

Frequency: 60 GHzMax Speed: Up to 176  
Gbps

Range: Short range, used for  
ultra-high-speed short-distance communications

Note:

Wi-Fi  
works on radio frequency.

Repeatation  
of radio frequency:

1 time/  
sec - 1 hz

1  
thousand/ sec - 1 Khz

1  
million/ sec - 1 Mhz

1  
billion/ sec - 1 Ghz

**2.4 Ghz**

**Low bandwidth, 100 Mbps**

**Longer range**

**5 Ghz**

**Fast speed, 1 Gbps**

**Shortest range,**

---

# Routing

**Routing** is the process of sending a packet of information from one network to another network.

To do this, routers use **Routing Tables**, which contain:

- The destination network and subnet mask
- The “next hop” router to reach the destination
- Routing metrics and Administrative Distance (AD)

---

### **Types of Protocols in Routing**

- **Routed Protocols**: These are Layer 3 protocols that assign logical addresses to devices and move data between networks.
    - **Examples**: IP, IPX
- **Routing Protocols**: These build the network topology and determine the best path to each destination.
    - **Examples**: RIP, IGRP, OSPF

---

### **Determining the Best Route**

Routers decide the best route using **three criteria, in this exact order**:

1. **Prefix-Length**

- The number of bits that identify the network.
    
- A **longer prefix-length** = more specific route.
    
- Example:
    
    Trying to reach 10.1.5.2/24
    
    - Routes in the table:
        - 10.1.5.0/24
        - 10.0.0.0/8
    - The router chooses **10.1.5.0/24** because it’s the most specific match.

2. **Metric**

- Used **within** a routing protocol to choose the best path.
- **Distance Vector protocols** (e.g., RIP): Use hop count.
- **Link State protocols** (e.g., OSPF): Use a cost metric.
- Only the best metric route is inserted into the routing table.
- If multiple equal-metric paths exist, routers typically load-balance.

3. **Administrative Distance (AD)**

- Used **between** routing protocols to decide which one to trust.
- Lower AD = More trusted
- If prefix-lengths are equal, AD determines the preferred route.

---

### Routing

**Routing** is the process of sending a packet of  
information from one network to another network.

_To route, routers build Routing  
Tables that contain the following:_

- The  
    destination network and subnet mask
- The  
    “next hop” router to get to the destination network
- Routing  
    metrics and Administrative Distance

_The routing table is concerned with  
two types of protocols:_

- A  
    routed protocol is a layer 3 protocol that applies logical addresses to devices  
    and routes data between networks. Examples would be IP and IPX.
- A  
    routing protocol dynamically builds the network, topology, and next hop  
    information in routing tables. Examples would be RIP, IGRP, OSPF, etc.

_Determining the best route by router  
:_

To  
determine the best route to a destination, a router considers three elements  
(in this order):

- Prefix-Length
- Metric  
    (within a routing protocol)
- Administrative Distance (between separate routing protocols)

**Prefix-length** is the number of bits used to  
identify the network, and is used to determine the most specific route. A  
longer prefix-length indicates a more specific route. For example, assume we  
are trying to reach a host address of 10.1.5.2/24. If we had routes to the  
following networks in the routing table:

10.1.5.0/24

10.0.0.0/8

The  
router will do a bit-by-bit comparison to find the most specific route (i.e.,  
longest matching prefix). Since the 10.1.5.0/24 network is more specific, that  
route will be used, regardless of metric or Administrative Distance.

_Administrative Distance vs. Metric_

A  
“metric” allows a router to choose the best path within a routing protocol.  
Distance vector routing protocols use “distance” (usually hop-count) as their  
metric. Link state protocols utilize some sort of “cost” as their metric.

Only  
routes with the best metric are added to the routing table. Thus, even if a  
particular routing protocol (for example, RIP) has four routes to the same  
network, only the route with the best metric (hop-count in this example) would  
make it to the routing table. If multiple equal-metric routes exist to a  
particular network, most routing protocols will load-balance.

If your  
router is running multiple routing protocols, Administrative Distance is used  
to determine which routing protocol to trust the most. Lowest administrative  
distance wins.

Again: if  
a router receives two RIP routes to the same network, it will use the routes’  
metric to determine which path to use. If the metric is identical for both  
routes, the router will load balance between both paths.

If a  
router receives a RIP and an OSPF route to the same network, it will use  
Administrative Distance to determine which routing path to choose.

_The Administrative Distance of  
common routing protocols (remember, lowest wins):_

A route  
with an “unknown” Administrative Distance will never be inserted into the  
routing table.

**The following command will allow you to view the  
routing table:**

Router#  
show ip route

**Routes are labeled based on what protocol placed them  
in the table:**

C –  
Directly connected

S –  
Static

S* -  
Default route

D - EIGRP

R – RIP

I – IGRP

i – IS-IS

O - OSPF

Notice  
the RIP routes contain the following field: [120/1]. This indicates both the  
administrative distance and the metric (the 120 is the AD, and the 1 is the  
hop-count metric).

**To clear all routes from the routing table, and thus  
forcing any routing protocol to repopulate the table:**

Router#  
clear ip route *

_Example:- Choosing the Best Route_

Assume  
the following routes existed to the following host: 192.168.111.5/24

We have  
two RIP routes, an OSPF route, and a Static route to that destination. Which  
route will be chosen by the router?

Remember  
the three criteria the router considers:

- Prefix-Length
- Metric
- Administrative Distance

The  
static route has the lowest administrative distance (1) of any of the routes;  
however, its prefix-length is less specific. 192.168.111.0/24 is a more  
specific route than 192.168.0.0/16. Remember, prefix-length is always  
considered first.

The  
second RIP route will not be inserted into the routing table, because it has a  
higher metric (5) than the first RIP route (1). Thus, our routing table will  
actually look as follows:

Thus, the  
true choice is between the OSPF route and the first RIP route. OSPF has the  
lowest administrative distance, and thus that route will be preferred.

PLEASE  
NOTE: Calculating the lowest metric route within a routing protocol occurs  
before administrative distance chooses the route it “trusts” the most. This is  
why the order of the above “criteria” is prefix-length, metric, and then  
administrative distance.

However,  
the route with the lowest administrative distance is always preferred,  
regardless of metric (assuming the prefix-length is equal). Thus, the metric is  
calculated first, but not preferred first over AD.

---