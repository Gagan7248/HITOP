---
title: Block a Website or URL on FortiGate Using Web Filter and Firewall Policy
date: 2026-10-15 12:30:00
categories:
  - how-to-guide
description: Learn how to block specific websites and URLs on FortiGate using Web Filter profiles and firewall policies with step-by-step instructions and screenshots.
thumbnail: images/block-url-on-fortigate.svg
---
## 1. Overview

FortiGate Web Filter allows network administrators to block access to specific websites(www.youtube.com), domains, and URL paths. 

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
    Create URL Filter 
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
    Apply Web Filter
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
## 3. Step 1: Create a Web Filter profile

1. Log in to the FortiGate administrative GUI.
    
2. Navigate to Security Profiles → Web Filter.
    
3. Click Create New
    
4. Enter a profile name, for example, `Block_Websites`.
    
5. Locate the Static URL Filter section.
    
6. Enable URL Filter.

***Reference:** Fortinet's FortiOS 7.4.8 Administration Guide. Your interface may differ slightly.*
Official reference: [Fortinet — Static URL Filter](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

## 4. Step 2: Add the URL to block

In the Static URL Filter section:

1. Click Create New.
    
2. Enter the URL pattern.
    
3. Select the filter type.
    
4. Set the action to Block.
    
5. Ensure the status is Enabled.
    
6. Save the entry and then save the profile.
    

![FortiGate URL Blocking](../../../images/enable-statis-url.png)
### Screenshot 2 — Example of a blocked URL

Use the following example configuration:

|Field|Value|
|---|---|
|URL|`*facebook.com`|
|Type|Wildcard|
|Action|Block|
|Status|Enabled|

Fortinet's documentation uses `*facebook.com` as an example wildcard entry.

Fortinet Document Library

+1

### Common URL patterns

|Requirement|Example pattern|
|---|---|
|Block a domain and matching subdomains|`*example.com*`|
|Block a specific hostname|`www.example.com`|
|Block a URL path|`example.com/downloads*`|
|Block another website|`*facebook.com`|

Note: Matching behavior depends on the selected filter type. A Simple match is stricter than a Wildcard match. Test your patterns before deploying them to all users.

## 5. Step 3: Apply the Web Filter to a firewall policy

A URL filter will not protect users unless the applicable traffic passes through a firewall policy with the Web Filter profile enabled.

1. Go to Policy & Objects → Firewall Policy.
    
2. Find the policy that allows LAN users to access the Internet.
    
3. Click Edit.
    
4. Locate the Security Profiles section.
    
5. Enable Web Filter.
    
6. Select the `Block_Websites` profile created earlier.
    
7. Select `certificate-inspection` under SSL Inspection, as an initial configuration.
    
8. Click OK to save.
    

### Screenshot 3 — Firewall policy security profiles

Illustrative reference for the firewall policy settings. Confirm the options displayed on your own FortiGate.

Official reference: [Fortinet — Static URL Filter and Firewall Policy](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

Important: The Web Filter profile and firewall policy must use compatible inspection modes. Also check that the intended policy is the one actually handling the client's traffic.

Fortinet Document Library

+1

## 6. Step 4: Test the configuration

From a client computer connected through the FortiGate:

1. Open a browser.
    
2. Navigate to `https://www.facebook.com`.
    
3. Confirm that access is blocked.
    
4. Test another website to verify that general Internet access still works.
    

### Expected result

Blocked website

The browser should display a FortiGate block or replacement page, or the request may fail depending on the inspection and browser configuration.

Other websites

Websites not matched by a blocking rule should remain accessible, subject to the rest of your security policies.

## 7. Step 5: Check Web Filter logs

If the website is still accessible, check the logs:

1. Navigate to Log & Report → Security Events.
    
2. Open the Web Filter events.
    
3. Filter for the client's source IP address or the destination hostname.
    
4. Review the action, matched URL, profile, and policy ID.
    

### Screenshot 4 — Web Filter logs

Look for an entry with an action such as `blocked` and a message indicating that the URL matched the local URL filter.

Official reference: [Fortinet — Static URL Filter and verification](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

## 8. Troubleshooting

|Problem|What to check|
|---|---|
|Website is still accessible|Confirm the correct profile is attached to the active firewall policy.|
|Domain is blocked but a subdomain is accessible|Review the URL pattern and test the subdomain separately.|
|Domain is blocked but a particular page is accessible|Check whether the pattern includes the required URL path.|
|HTTPS path is not blocked|Certificate inspection does not provide the same URL visibility as deep inspection.|
|No Web Filter logs appear|Verify logging settings, log storage, and whether the traffic matches the expected policy.|
|Web Filter is not visible|Check System → Feature Visibility and enable the relevant feature if supported.|

### HTTPS limitation

With HTTPS traffic, certificate inspection provides less visibility into encrypted URL paths than deep inspection. Blocking a whole domain is generally more straightforward than blocking only one page. Deep inspection can require installing and trusting the FortiGate inspection CA certificate on client devices.

Community

+1

## 9. Final checklist

Deployment checklist

0 of 6

URL Filter is enabled in the Web Filter profile

URL pattern, filter type, and Block action are correct

Web Filter profile is applied to the correct firewall policy

SSL Inspection is configured appropriately

Blocked website tested from a client computer

Web Filter logs confirm the block

Copy checklist

## 10. Official references

- [Fortinet — Static URL Filter (FortiOS 7.4.8)](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 
    
- [Fortinet — Configuring a Web Filter Profile](https://docs.fortinet.com/document/fortigate/7.4.4/administration-guide/267887/configuring-a-web-filter-profile) 
    
- [Fortinet — Firewall Policy](https://docs.fortinet.com/document/fortigate/7.4.0/administration-guide/656084/firewall-policy) 
    

Conclusion: To block a website on FortiGate, create a blocking entry under Static URL Filter, enable the Web Filter profile on the relevant LAN-to-Internet firewall policy, and verify the result using a client test and Web Filter logs.