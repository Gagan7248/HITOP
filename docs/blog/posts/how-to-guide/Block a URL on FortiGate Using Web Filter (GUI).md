---
title: Block a URL on FortiGate Using Web Filter
date: 2026-10-15 12:30:00
categories:
  - how-to-guide
description: Learn how to block specific websites and URLs on FortiGate using Web Filter profiles and firewall policies with step-by-step instructions.
thumbnail: images/block-url-on-fortigate.png
---
---
# **Block a URL on FortiGate Using Web Filter**

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

**Step 1 — Create the URL filter**  
Security Profiles → Web Filter

**Step 2 — Apply the Web Filter profile**  
Policy & Objects → Firewall Policy

**Step 3 — Test and verify**

---
## Step 1. Create a Web Filter profile

1. Log in to the FortiGate administrative GUI.
	
2. Navigate to **Security Profiles → Web Filter**.
	
3. Click Create **New**
	
4. Enter a **profile name**, for example, `Block_Social_Media`. 
    
5. Locate the **Static URL Filter** section.
    
6. Enable **URL Filter**.

### Add the URL to block

In the Static URL Filter section:

1. Click Create **New**.
    
2. Enter the URL pattern. `www.youtube.com, www.facebook.com, www.instagram.com`
    
3. Select the filter type **Wildcard**.
    
4. Set the action to **Block**.
    
5. Set the status **Enabled**.
    
6. **Save** the entry and then save the profile.


Use the following example configuration: (Screenshot):

![FortiGate URL Blocking|533](../../../images/enable-static-url.png)

## Step 2: Apply the Web Filter to a firewall policy

A URL filter will not protect users unless the applicable traffic passes through a firewall policy with the Web Filter profile enabled.

1. Go to **Policy & Objects → Firewall Policy.**
    
2. Find the policy that allows LAN users to access the Internet (**LAN-to-WAN**).
    
3. Click **Edit**.
    
4. Locate the **Security Profiles** section.
    
5. Enable **Web Filter**.
    
6. Select the `Block_Youtube` profile created earlier.
    
7. Select `certificate-inspection` under SSL Inspection, as an initial configuration.
    
8. Click OK to **save**.

Use the following example configuration: (Screenshot):

![FortiGate URL Blocking|533](<../../../images/web-filter to-firewall-policy.png>)

## Step 3: Test & Verify

From any client computer connected through the FortiGate:

1. Open a browser.
    
2. Navigate to `https://www.youtube.com`.
    
3. Confirm that access is **blocked**.
    
4. Test another website to verify that general Internet access still works.

### Expected result

**Blocked website-** The browser should display a FortiGate block or replacement page, or the request may fail depending on the inspection and browser configuration.

**Other websites should be run-** Websites not matched by a blocking rule should remain accessible.

---
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

## Step 1: Create the URL filter list

1. Log in to the FortiGate firewall using **SSH**, a **console connection**, or the **CLI Console** available in the web interface.

2. First, create a URL filter table and add a rule to block social media sites.

```
config webfilter profile
    edit "Block-Social-Media"
        config ftgd-wf
        end
        config web
            set urlfilter-table enable
        end
        config urlfilter
            edit 1
                set name "Social-Media-URLs"
                set comment "Block YouTube Facebook Instagram"
                set action block
                set status enable
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
    next
end
```

| CLI Command                    | Explanation                             |
| ------------------------------ | --------------------------------------- |
| `config webfilter urlfilter`   | Enter Static URL Filter configuration   |
| `edit 1`                       | Select or create URL filter list ID 1   |
| `set name "Social-Media-URLs"` | Set the filter list name                |
| `config entries`               | Enter URL entries configuration         |
| `edit 1` / `edit 2` / `edit 3` | Create or select individual URL entries |
| `set url "*youtube.com"`       | Define the YouTube URL pattern          |
| `set url "*facebook.com"`      | Define the Facebook URL pattern         |
| `set url "*instagram.com"`     | Define the Instagram URL pattern        |
| `set type wildcard`            | Use wildcard URL matching               |
| `set action block`             | Block matching URLs                     |
| `set status enable`            | Enable the URL filter entry             |
| `next`                         | Finish the current entry                |
| `end`                          | Exit the current configuration section  |

## Step 2: Create the Web Filter profile and attach the URL list

```
config webfilter profile
    edit "Block-Social-Media"
        config web
            set urlfilter-table 1
        end
    next
end
```

***Note:** The number `1` refers to the URL filter list created in Step 2*

| CLI Command                 | Explanation                                     |
| --------------------------- | ----------------------------------------------- |
| `config webfilter profile`  | Enter Web Filter profile configuration mode     |
| `edit "Block-Social-Media"` | Create or edit the Web Filter profile           |
| `config web`                | Enter Web Filter settings                       |
| `set urlfilter-table 1`     | Associate URL filter list ID 1 with the profile |
| `end`                       | Exit Web Filter settings                        |

## Step 3: Apply the profile to an existing firewall policy

First, identify your LAN-to-WAN policy ID:

``show firewall policy``

Suppose your existing policy ID is `5`. Apply the profile without recreating the policy:

```
config firewall policy
    edit 5
        set utm-status enable
        set webfilter-profile "Block-Social-Media"
        set ssl-ssh-profile "certificate-inspection"
    next
end
```

Replace `5` with your actual policy ID. The SSL inspection setting above enables certificate inspection; do not overwrite an existing, more suitable inspection profile without checking its requirements.

If you have multiple LAN-to-WAN policies, repeat Step 4 for each policy that should block these sites.

| CLI Command                                    | Explanation                                         |
| ---------------------------------------------- | --------------------------------------------------- |
| `config firewall policy`                       | Enter firewall policy configuration mode            |
| `edit 5`                                       | Select firewall policy ID 5                         |
| `set utm-status enable`                        | Enable UTM security inspection features             |
| `set webfilter-profile "Block-Social-Media"`   | Apply the Web Filter profile to the firewall policy |
| `set ssl-ssh-profile "certificate-inspection"` | Apply the SSL/SSH inspection profile                |

## Step 4: Verify the configuration

```
show webfilter urlfilter
show webfilter profile "Block-Social-Media"
show firewall policy 5
```

| CLI Command                                   | Explanation                                                  |
| --------------------------------------------- | ------------------------------------------------------------ |
| `show webfilter urlfilter`                    | Display configured Static URL Filter lists and their entries |
| `show webfilter profile "Block-Social-Media"` | Display the Web Filter profile configuration                 |
| `show firewall policy 5`                      | Display the configuration of firewall policy ID 5            |

Test YouTube, Facebook, and Instagram from a client whose traffic passes through the configured policy.

Note: HTTPS, QUIC/HTTP3, alternate domains, and application-specific endpoints can affect blocking coverage. For more comprehensive blocking, you may need appropriate SSL inspection, QUIC control, and FortiGuard application or category filtering.

***Official Reference:** Fortinet's FortiOS 7.4.8 Administration Guide. Your interface may differ slightly.*
Reference Source: [Fortinet — Static URL Filter and verification](https://docs.fortinet.com/document/fortigate/7.4.8/administration-guide/371670/static-url-filter) 

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

## Conclusion

Blocking a website on FortiGate using CLI involves three main tasks: configuring a Static URL Filter, associating it with a Web Filter profile, and applying that profile to the appropriate firewall policy.















