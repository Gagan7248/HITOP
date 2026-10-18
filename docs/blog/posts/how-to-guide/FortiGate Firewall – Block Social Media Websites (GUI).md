---
title: FortiGate Firewall – Block Social Media Websites (GUI)
date: 2026-10-15 12:30:00
categories:
  - how-to-guide
description: Learn how to block specific websites and URLs on FortiGate using Web Filter profiles and firewall policies with step-by-step instructions.
thumbnail: images/block-url-on-fortigate.png
---
---
# FortiGate Firewall – Block Social Media Websites Using (GUI)

## Overview

FortiGate Web Filter allows network administrators to block access to specific websites like: `www.youtube.com, www.facebook.com, www.instagram.com`, domains, and URL paths. 

### Configuration workflow

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

---
## Step 1: Create the Web Filter Profile

1. Log in to the FortiGate GUI.
    
2. Navigate to **Security Profiles → Web Filter**.
    
3. Click **Create New**.
    
4. Enter the profile name: `Block-Social-Media`.

##  Step 2: Configure Static URL Filter

Inside the new Web Filter profile:

1. Find the **Static URL Filter** section.
    
2. Enable **URL Filter**.
    
3. Click **Create New** for each website.
    
4. Add the following entries:

| URL              | Type     | Action | Status |
| ---------------- | -------- | ------ | ------ |
| `*youtube.com`   | Wildcard | Block  | Enable |
| `*facebook.com`  | Wildcard | Block  | Enable |
| `*instagram.com` | Wildcard | Block  | Enable |
**Purpose:** Adds the social media websites to the URL block list.

Use the following example configuration: (Screenshot):

![FortiGate URL Blocking|533](../../../images/enable-static-url.png)

## Step 3: Apply the Profile to the Firewall Policy

A URL filter will not protect users unless the applicable traffic passes through a firewall policy with the Web Filter profile enabled.

1. Go to **Policy & Objects → Firewall Policy**.
    
2. Identify the policy that allows users to access the internet.
    
3. Edit that policy.
    
4. Enable **Security Profiles** or **UTM Inspection**, depending on the FortiOS version.
    
5. Enable **Web Filter**.
    
6. Select the profile `Block-Social-Media`.
    
7. Enable **SSL/SSH inspection** as appropriate for your network.
    
8. Save the policy.

**Important:** Edit the correct internet access policy. Do not change unrelated policies.

Use the following example configuration: (Screenshot):

![FortiGate URL Blocking|533](<../../../images/web-filter to-firewall-policy.png>)

## Step 4: Test the Configuration

1. Connect a client computer to the network.
    
2. Open YouTube, Facebook, and Instagram.
    
3. Confirm that the websites are blocked.
    
4. If YouTube videos still play, check HTTPS inspection, QUIC/HTTP/3 traffic, and whether the correct firewall policy is being used.

### Expected Result

YouTube, Facebook, and Instagram should be blocked for users whose internet traffic passes through the configured firewall policy. Websites not matched by a blocking rule should remain accessible.

**Note:** GUI menu names can differ between FortiOS versions. Configuration must be tested on a client device to confirm that blocking is working.

## Check Web Filter logs

If the website is still accessible, check the **logs**:

1. Navigate to **Log & Report → Security Events.**
    
2. Open the **Web Filter events**.
    
3. Filter for the **client's source IP address** or the **destination hostname**.
    
4. Review the action, **matched URL**, **profile**, and **policy ID**.
	
5. Look for an entry with an action such as `blocked` and a message indicating that the URL matched the local URL filter.

Use the following example configuration: (Screenshot):

![FortiGate URL Blocking|665](<../../../images/blocked-webfilter-logs.png>)



<hr style="border: none; height: 3px; background-color: #333;">
# **Using CLI**

## Overview

FortiGate firewalls also allow administrators to block Web Filter feature and firewall policies using  graphical user interface (GUI) as well as Command Line Interface (CLI).

## Step 1: Create the URL Filter Table

1. Log in to the FortiGate firewall using **SSH**, a **console connection**, or the **CLI Console** available in the web interface.

2. First, create a URL filter table and add a rule to block social media sites.

```
config webfilter urlfilter
    edit 1
        set name "Social-Media-URLs"
        config entries
            edit 1
                set url "*youtube.com"
                set type wildcard
                set action block
            next
            edit 2
                set url "*facebook.com"
                set type wildcard
                set action block
            next
            edit 3
                set url "*instagram.com"
                set type wildcard
                set action block
            next
        end
    next
end
```

**Purpose:** Creates a URL Filter table containing the websites to be blocked.

## Step 2: Configure the Web Filter Profile

```shell
config webfilter profile
    edit "Block-Social-Media"
        config web
            set urlfilter-table 1
        end
    next
end
```

**Purpose:** Links URL Filter table ID `1` to the `Block-Social-Media` profile.

## Step 3: Apply the Profile to the Firewall Policy

First, identify the firewall policy used for internet access:

```shell
show firewall policy
```

Use the actual policy ID in the following commands. The example below uses policy ID `1`.

```shell
config firewall policy
    edit 1
        set utm-status enable
        set webfilter-profile "Block-Social-Media"
    next
end
```

**Purpose:** Enables security inspection and applies the custom Web Filter profile to the selected firewall policy.

***Important:** Modify the correct internet access policy to avoid affecting other network traffic.*


## Step 4: Verify the Configuration

### Check the URL Filter table:

```shell
show webfilter urlfilter
```

### Check the Web Filter profile:

```shell
show webfilter profile "Block-Social-Media"
```

### Check the firewall policy:

```shell
show firewall policy
```

### Confirm that the correct policy has the following settings:

```shell
set utm-status enable
set webfilter-profile "Block-Social-Media"
```

### Expected Result

- YouTube, Facebook, and Instagram should be blocked for users whose traffic passes through the configured firewall policy.
    
- The custom Web Filter profile should be applied to the correct policy.
    
- Test the websites from a client computer to confirm that blocking works.

### Troubleshooting

If YouTube videos still play after applying the configuration, check HTTPS inspection, QUIC/HTTP/3 traffic, and whether the traffic is actually passing through the configured policy.

**Note:** Configuration alone does not guarantee successful blocking. Always test and verify the result on the client device.

---
### Important Consideration: 

1. **Correct Policy ID:** Verify that you are modifying the correct LAN-to-WAN firewall policy handling the client's traffic.
    
2. **Profile Association:** Ensure the Static URL Filter list is linked to the intended Web Filter profile and that the profile is applied to the relevant firewall policies.
    
3. **Wildcard Matching:** Configure URL patterns carefully, such as `*facebook.com`, because matching behavior may vary with the pattern and FortiOS version.
    
4. **HTTPS Inspection:** URL filtering capabilities depend on the SSL inspection profile and the visibility available for encrypted traffic.
    
5. **Additional Domains:** Applications may use additional domains, content delivery networks (CDNs), and alternate endpoints. Blocking one domain may not block the entire application.
    
6. **QUIC and HTTP/3:** These protocols can affect filtering behavior. Review QUIC handling if blocking is incomplete.
    
7. **Existing Configuration:** Review existing firewall and security profiles before making changes to avoid overwriting required settings.
      
8. **FortiOS Compatibility:** Confirm command syntax and supported features for your FortiGate FortiOS version.
    
9. **Production Deployment:** Test changes in a controlled environment before applying them to production networks.

***Official Reference:** Fortinet's FortiOS 7.4.8 Administration Guide. Your interface may differ slightly.*
Reference Source: [Fortinet — Static URL Filter and verification](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 
## Conclusion

Blocking a website on FortiGate using CLI involves three main tasks: configuring a Static URL Filter, associating it with a Web Filter profile, and applying that profile to the appropriate firewall policy.















