---
title: Block a Website or URL on FortiGate Using Web Filter and Firewall Policy
date: 2026-10-15 12:30:00
categories:
  - how-to-guide
description: Learn how to block specific websites and URLs on FortiGate using Web Filter profiles and firewall policies with step-by-step instructions.
thumbnail: images/block-url-on-fortigate.svg
---
## 1. Overview

FortiGate Web Filter allows network administrators to block access to specific websites `www.youtube.com`, domains, and URL paths. 

## 2. Configuration workflow

<div>

<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 600 180"
     width="100%"
     role="img"
     aria-label="FortiGate URL filtering workflow">

  <rect width="600" height="180" rx="12" fill="#f1f5f9"/>

  <rect x="15" y="35" width="165" height="100"
        rx="10" fill="#fff" stroke="#dc2626" stroke-width="2"/>

  <text x="97" y="65" text-anchor="middle"
        font-size="15" font-weight="bold" fill="#172554">
    Step 1
  </text>
  <text x="97" y="90" text-anchor="middle"
        font-size="12" fill="#334155">
    Create URL Filter Profile
  </text>

  <path d="M185 85 H215" stroke="#dc2626" stroke-width="3"/>
  <polygon points="215,79 225,85 215,91" fill="#dc2626"/>

  <rect x="230" y="35" width="165" height="100"
        rx="10" fill="#fff" stroke="#dc2626" stroke-width="2"/>

  <text x="312" y="65" text-anchor="middle"
        font-size="15" font-weight="bold" fill="#172554">
    Step 2
  </text>
  <text x="312" y="88" text-anchor="middle"
        font-size="12" fill="#334155">
    Apply Web Filter Profile
  </text>
  <text x="312" y="105" text-anchor="middle"
        font-size="12" fill="#334155">
    to Firewall Policy
  </text>

  <path d="M400 85 H430" stroke="#dc2626" stroke-width="3"/>
  <polygon points="430,79 440,85 430,91" fill="#dc2626"/>

  <rect x="445" y="35" width="140" height="100"
        rx="10" fill="#fff" stroke="#16a34a" stroke-width="2"/>

  <text x="515" y="65" text-anchor="middle"
        font-size="15" font-weight="bold" fill="#166534">
    Step 3
  </text>
  <text x="515" y="90" text-anchor="middle"
        font-size="12" fill="#334155">
    Test &amp; Verify
  </text>

</svg>

</div>

**Step 1 — Create the URL filter**  
Security Profiles → Web Filter

**Step 2 — Apply the Web Filter profile**  
Policy & Objects → Firewall Policy

**Step 3 — Test and verify**
## Step 1. Create a Web Filter profile

1. Log in to the FortiGate administrative GUI.
	
2. Navigate to Security Profiles → Web Filter.
	
3. Click Create New
	
4. Enter a profile name, for example, `Block_Websites`. 
    
5. Locate the Static URL Filter section.
    
6. Enable URL Filter.

***Reference:** Fortinet's FortiOS 7.4.8 Administration Guide. Your interface may differ slightly.*
Official reference: [Fortinet — Static URL Filter](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

### Add the URL to block

In the Static URL Filter section:

1. Click Create New.
    
2. Enter the URL pattern. (`www.youtube.com)
    
3. Select the filter type Wildcard.
    
4. Set the action to Block.
    
5. Set the status Enabled.
    
6. Save the entry and then save the profile.


Use the following example configuration:

| Field  | Value           |
| ------ | --------------- |
| URL    | `*facebook.com` |
| Type   | Wildcard        |
| Action | Block           |
| Status | Enabled         |

![FortiGate URL Blocking|533](../../../images/enable-statis-url.png)

## Step 2: Apply the Web Filter to a firewall policy

A URL filter will not protect users unless the applicable traffic passes through a firewall policy with the Web Filter profile enabled.

1. Go to Policy & Objects → Firewall Policy.
    
2. Find the policy that allows LAN users to access the Internet (LAN-to-WAN).
    
3. Click Edit.
    
4. Locate the Security Profiles section.
    
5. Enable Web Filter.
    
6. Select the `Block_Websites` profile created earlier.
    
7. Select `certificate-inspection` under SSL Inspection, as an initial configuration.
    
8. Click OK to save.

Use the following example configuration:

![FortiGate URL Blocking|533](<../../../images/web-filter to-firewall-policy.png>)

Official reference: [Fortinet — Static URL Filter and Firewall Policy](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

## Step 3: Test & Verify

From a client computer connected through the FortiGate:

1. Open a browser.
    
2. Navigate to `https://www.youtube.com`.
    
3. Confirm that access is blocked.
    
4. Test another website to verify that general Internet access still works.
    

### Expected result

**Blocked website**

The browser should display a FortiGate block or replacement page, or the request may fail depending on the inspection and browser configuration.

**Other websites should be run.**

Websites not matched by a blocking rule should remain accessible.

## 7. Step 5: Check Web Filter logs

If the website is still accessible, check the logs:

1. Navigate to Log & Report → Security Events.
    
2. Open the Web Filter events.
    
3. Filter for the client's source IP address or the destination hostname.
    
4. Review the action, matched URL, profile, and policy ID.
	
5. Look for an entry with an action such as `blocked` and a message indicating that the URL matched the local URL filter.

![FortiGate URL Blocking|665](<../../../images/blocked-webfilter-logs.png>)

Official reference: [Fortinet — Static URL Filter and verification](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 
