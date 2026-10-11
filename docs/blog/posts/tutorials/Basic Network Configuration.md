---
title: Basic Network Configuration
date: 2026-10-12
categories:
  - Tutorials
description: Basic Network Configuration
thumbnail: images/microtik configuration.svg
---
---

### Reset Configuration (Optional)

**System→Reset Configuration**

`/system reset-configuration`

---

### **Set Router Identity (Hostname)**

**System→Identity**

`/system identity set name=MyRouter`

---

### **INTERFACE NAMING**

**Main Menu → Interfaces**

![image.png](attachment:dfc1aa3d-717d-41d3-ba02-57f3b575a161:image.png)

1. Select Interfaces option from Main Menu
2. Double click on a interface →Set a name for desire interfaces/put a comments

---

### BRIDGE INTERFACE

**Main Menu →Bridge**

![image.png](attachment:ac1621cd-c092-4e96-977c-7c190d54c12d:image.png)

1. Select the bridge option from the Main Menu
2. Go to Bridge tab and click on (+) button
3. Choose a name for the bridge interface
4. Click Apply and ok

![image.png](attachment:81ef0f14-339d-4945-922c-6c37528c1408:image.png)

1. Go to the Port Tab and Click on (+) button
2. Select the Interface you want to add to the bridge
3. Select the bridge you created
4. Apply and Ok
5. Repeat same to add more interface to the bridge.

---

### CONFIGURE WAN INTERFACE

**IP→Addresses**

![image.png](attachment:618e3a7f-8c4a-42d2-8843-ee87694146fe:image.png)

1. Click on (+) Tab
2. Enter the WAN IP address with their CIDR Value(Subnet Mask)
3. Select the Interface for the WAN
4. Apply and ok

---

### CONFIGURE LAN INTERFACE

**IP →Addresses**

![image.png](attachment:0df16437-1726-4f9d-81c7-0e74a8ea3759:image.png)

1. Add the IP Address to the LAN Interface with (CIDR Value) **Subnet Mask**
2. Click apply then It will take the the **network** Address automatically
3. Select the LAN Interface
4. Apply and ok

---

### DNS SERVER

**IP→ DNS**

![image.png](attachment:83107eb0-3cbd-4a42-aeb9-4b626138ac0a:image.png)

1. Add (8.8.8.8) as Primary
2. Add 8.2.2.2.2 as Secondary
3. Apply and ok

---

### IP ADDRESS POOL

**IP→ Pool**

![image.png](attachment:488d570f-96a0-4fa3-a545-2350b21b34ef:image.png)

1. Add a **Name** for Pool
2. Add the IP **Rage** for the Pool..
3. Apply and OK.

---

### DHCP SERVER FOR LAN

**IP→DHCP Server**

![image.png](attachment:89a24744-e49e-45d6-86c8-64c4a67753eb:image.png)

1. In **DHCP Tab** click Plus(+) Button
2. Choose a name for **DHCP Server**
3. Select the **LAN Port & IP Pool Name**
4. Click **Apply** and **OK**

![image.png](attachment:a475ae1e-86f1-4bb3-a6cd-1a7a3610d275:image.png)

1. **In Network Tab**
2. Enter the **DHCP Network** with CIDR Value.
3. Enter the **Gateway IP Address (LAN Interface IP Address)**
4. Click **Apply** and **OK**

---

### **Set Up NAT (Masquerade)**

**IP→Firewall**

![image.png](attachment:339d2d00-9a5a-49b0-a25b-e1a7c1197455:image.png)

1. In the NAT Tab and (+) Button
2. **Chain option: srcnat**
3. **Src. Address: <**_local network with CIRD Value>_
4. Apply and OK

![image.png](attachment:c3decc76-56da-4b8a-8d73-a7f628773d64:image.png)

1. In Action Tab
2. **Action : Masquerade**
3. Apply and OK

---

### CONFIGURE DEFAULT ROUTES

**IP→Routes**

![image.png](attachment:4ef6179d-e7dc-4662-a635-e25172dad1f5:image.png)

1. Click on (+) button
2. Dst Address : 0.0.0.0
3. Gateway : <_default gateway of WAN>_
4. Apply and ok

---

### TEST INTERNET ACCESS

**Terminal**

![image.png](attachment:66e1cacf-8650-420d-83c9-e121ba9fb60e:image.png)

1. `Ping [google.com](<http://google.com>)` and `8.8.8.8` .

![image.png](attachment:d5bff3a6-6a25-4c1d-96d5-a213f12de6f4:image.png)

---