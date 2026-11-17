---
title: "SOP-001: PROPERTY MANAGEMENT SYSTEM (PMS) OPERATIONS & SUPPORT"
date: 2026-11-15 11:00:00
categories:
  - SOPs
description: Standard Operating Procedure is to establish a standardized process to manage the Property Management System (PMS) used in hotel operations.
thumbnail: images/IT-SOP-001-png
---
# SOP-001: PROPERTY MANAGEMENT SYSTEM (PMS) OPERATIONS & SUPPORT

**Department:** Information Technology  
**Document ID:** HIT-SOP-001  
**Version:** 1.0  
**Document Type:** Standard Operating Procedure  
**Applicability:** Hotel IT Departments  
**Review Frequency:** Annually or whenever significant system changes occur  
**Prepared By:** IT Department  
**Approved By:** Authorized Hotel Management

---

## 1. PURPOSE

The purpose of this Standard Operating Procedure is to establish a standardized process for the operation, monitoring, maintenance, troubleshooting, security and technical support of the Property Management System (PMS) used in hotel operations.

The PMS is a critical hotel application responsible for supporting various operational activities, including reservations, guest check-in and check-out, room management, billing, cashiering, guest profiles and operational reporting.

This SOP ensures that the PMS remains available, secure, properly configured and accessible to authorized users, minimizing operational interruptions and protecting hotel and guest information.

## 2. SCOPE

This SOP applies to all PMS-related IT operations and technical support activities, including:

- PMS application availability and monitoring.
    
- PMS user account creation and management.
    
- User access and permission control.
    
- Login and application troubleshooting.
    
- PMS workstation and terminal support.
    
- PMS-related network connectivity.
    
- Integration and interface monitoring.
    
- Database and application backup coordination.
    
- PMS updates and maintenance coordination.
    
- Incident reporting and escalation.
    
- PMS downtime and recovery support.
    
- Vendor coordination and technical documentation.
    

This SOP applies whether the PMS is cloud-hosted, locally hosted, server-based or provided through a managed service.

## 3. RESPONSIBILITIES

### 3.1 IT Manager

The IT Manager is responsible for:

- Overall PMS technical administration and support oversight.
    
- Ensuring system availability and operational reliability.
    
- Coordinating with PMS vendors and service providers.
    
- Reviewing user access and permissions periodically.
    
- Monitoring recurring technical issues.
    
- Approving or coordinating technical changes according to hotel authorization procedures.
    
- Ensuring backup and recovery arrangements are maintained.
    
- Maintaining PMS-related technical documentation.
    
- Reporting critical system issues to hotel management.
    

### 3.2 IT Executive / IT Support Engineer

Responsibilities include:

- Providing first-level PMS technical support.
    
- Troubleshooting login and connectivity problems.
    
- Checking PMS workstation and peripheral connectivity.
    
- Logging and tracking reported incidents.
    
- Performing authorized user administration.
    
- Monitoring system availability.
    
- Coordinating with vendors for unresolved issues.
    
- Maintaining technical support records.
    
- Following escalation procedures.
    

### 3.3 Front Office Department

Responsibilities include:

- Reporting PMS operational problems to IT.
    
- Ensuring that employees use their assigned accounts.
    
- Reporting incorrect access or suspicious account activity.
    
- Following approved operational procedures during PMS downtime.
    
- Verifying operational transactions after system recovery.
    
- Coordinating with IT for user access requirements.
    

### 3.4 Authorized PMS Vendor / Service Provider

Responsibilities may include:

- Application-level technical support.
    
- Advanced troubleshooting.
    
- Software updates and bug fixes.
    
- Database-level technical support.
    
- Integration troubleshooting.
    
- Backup and recovery assistance, where contracted.
    
- Escalated incident resolution.
    

### 3.5 Department Heads / Authorized Approvers

Responsibilities include:

- Approving employee access requests.
    
- Confirming required user roles and permissions.
    
- Authorizing changes affecting departmental operations.
    
- Reviewing access requirements when employees transfer or leave.
    

## 4. PMS SYSTEM ACCESS MANAGEMENT

### 4.1 New User Account Creation

The following procedure must be followed when creating a new PMS user account:

1. Receive a formal user access request from the concerned department head or authorized manager.
    
2. Verify the employee's identity and department.
    
3. Confirm the required PMS role and access permissions.
    
4. Obtain the necessary approval before creating the account.
    
5. Create an individual user account using the employee's authorized identification.
    
6. Assign only the permissions required for the employee's job responsibilities.
    
7. Configure password and authentication requirements according to the PMS security capabilities and hotel policy.
    
8. Ensure that default or temporary passwords are changed before normal use.
    
9. Inform the employee about account confidentiality and acceptable usage.
    
10. Record the account creation details in the PMS User Access Register.
    

**Important:** Shared user accounts must not be used for routine individual employee activities. Each employee should have a uniquely identifiable account wherever the PMS supports it.

### 4.2 User Access Modification

When an employee changes department, designation or job responsibilities:

1. Receive an approved access modification request.
    
2. Review the employee's existing permissions.
    
3. Confirm the new role with the concerned department head.
    
4. Remove unnecessary permissions.
    
5. Assign the newly approved permissions.
    
6. Verify that the updated access works correctly.
    
7. Update the user access register.
    

### 4.3 User Account Deactivation

When an employee resigns, is terminated or no longer requires PMS access:

1. Receive an authorized employee separation or access removal notification.
    
2. Verify the employee's identity and account details.
    
3. Disable or deactivate the PMS account according to the approved timeline.
    
4. Revoke associated sessions, tokens or remote access where applicable.
    
5. Coordinate removal of related access to connected systems if required.
    
6. Update the PMS User Access Register.
    
7. Retain relevant records according to hotel policy.
    

For urgent terminations or suspected unauthorized access, account deactivation must be coordinated immediately with the authorized management team.

## 5. DAILY PMS SYSTEM MONITORING

The IT team should perform the following checks according to the hotel's operational schedule.

### 5.1 Application Availability

- Verify that the PMS application is accessible.
    
- Check application login functionality.
    
- Confirm that authorized users can access their respective modules.
    
- Identify unexpected application errors or service interruptions.
    
- Verify application connectivity for critical operational workstations.
    

### 5.2 Workstation Connectivity

- Check PMS-connected workstations.
    
- Verify LAN or Wi-Fi connectivity, as applicable.
    
- Check system date and time synchronization.
    
- Verify printer and peripheral connectivity where integrated with PMS.
    
- Identify abnormal system performance or application freezing.
    

### 5.3 Interface and Integration Monitoring

Where integrations are implemented, check the status of relevant interfaces, such as:

- POS integration.
    
- Payment gateway integration.
    
- Channel manager and booking engine integration.
    
- Key card / electronic door lock integration.
    
- Telephone / EPABX integration.
    
- Guest Wi-Fi integration.
    
- Accounting and financial system integration.
    
- Other approved third-party applications.
    

Check for failed transactions, synchronization delays, interface errors or communication failures.

**Note:** Operational transaction verification belongs to the authorized business department. IT is responsible for technical interface monitoring and troubleshooting.

### 5.4 Database and Server Health

For locally hosted or IT-managed environments:

- Check relevant PMS application services.
    
- Monitor database availability.
    
- Review available storage capacity.
    
- Check server resource utilization.
    
- Review critical application and database error logs.
    
- Verify backup job completion status.
    

For cloud-hosted PMS environments:

- Check service availability through the vendor's official status portal, where available.
    
- Review service notifications and maintenance announcements.
    
- Report suspected cloud service outages to the provider.
    
- Maintain records of service interruptions.
    

## 6. PMS TROUBLESHOOTING PROCEDURE

When a PMS-related complaint is received, IT personnel must follow a structured troubleshooting process.

### Step 1: Register the Complaint

Record the following information:

- Date and time of complaint.
    
- Name and department of the reporting employee.
    
- Workstation or terminal identification.
    
- PMS module affected.
    
- Description of the issue.
    
- Error message or screenshot, where appropriate and safe.
    
- Number of affected users.
    
- Operational impact.
    

### Step 2: Identify the Problem Category

Classify the problem into one of the following categories:

- User login issue.
    
- Password or account issue.
    
- Application access issue.
    
- Network connectivity issue.
    
- Workstation performance issue.
    
- Printer or peripheral issue.
    
- PMS application error.
    
- Database connectivity issue.
    
- Integration or interface failure.
    
- Vendor-side service interruption.
    

### Step 3: Perform Initial Checks

1. Verify network connectivity.
    
2. Check whether the issue affects one user or multiple users.
    
3. Verify application availability.
    
4. Check workstation health.
    
5. Confirm the affected user's access permissions.
    
6. Review relevant application or system error messages.
    
7. Check vendor service notifications if the PMS is cloud-hosted.
    

### Step 4: Resolve or Escalate

- Resolve issues within the IT team's authorized technical capabilities.
    
- Do not make unauthorized application or database changes.
    
- Escalate application-level issues to the PMS vendor when required.
    
- Inform the IT Manager about critical operational interruptions.
    
- Coordinate with the affected department until normal operations are restored.
    

### Step 5: Verify Resolution

- Confirm that the affected user can access the system.
    
- Verify that the reported functionality is working.
    
- Obtain confirmation from the concerned department.
    
- Update the complaint or incident record.
    
- Document the root cause and corrective action where identified.
    

## 7. PMS CHANGE AND UPDATE MANAGEMENT

Any change affecting PMS configuration, application functionality, integrations or infrastructure must follow an approved change management process.

Examples include:

- PMS software upgrades.
    
- Application patches.
    
- Configuration modifications.
    
- User role changes.
    
- Interface configuration changes.
    
- Database changes.
    
- Server migrations.
    
- Network configuration changes affecting PMS connectivity.
    

### Procedure

1. Identify the requirement for change.
    
2. Record the proposed change and its business justification.
    
3. Assess operational impact and associated risks.
    
4. Obtain authorization from the appropriate management representative.
    
5. Coordinate with the PMS vendor where required.
    
6. Schedule the change during an approved maintenance window.
    
7. Confirm that suitable backups or recovery arrangements are available.
    
8. Inform affected departments before implementation.
    
9. Perform the approved change.
    
10. Test critical PMS functions after implementation.
    
11. Obtain confirmation from the concerned operational department.
    
12. Document the change and its outcome.
    

**Important:** Changes involving live PMS databases, financial records or guest information must only be performed by authorized personnel following approved vendor and hotel procedures.

## 8. PMS BACKUP AND DATA RECOVERY COORDINATION

PMS data is critical to hotel operations and business continuity.

The IT Manager must ensure that appropriate backup and recovery arrangements exist.

### 8.1 Backup Requirements

- Identify whether PMS data is stored locally, remotely or in the cloud.
    
- Confirm the party responsible for performing backups.
    
- Obtain documented information about backup frequency and retention.
    
- Verify backup job status wherever IT has access.
    
- Ensure backup storage is protected against unauthorized access.
    
- Confirm that recovery procedures are documented.
    
- Coordinate periodic restoration testing with the responsible provider.
    

### 8.2 Backup Failure

If a backup failure is identified:

1. Record the failure date and time.
    
2. Identify the affected backup job or system.
    
3. Notify the IT Manager.
    
4. Contact the responsible technical team or PMS vendor.
    
5. Confirm whether a successful alternative recovery point exists.
    
6. Track the issue until resolved.
    
7. Record corrective action and confirmation of successful backup completion.
    

### 8.3 Data Restoration

Data restoration must be performed only after proper authorization and impact assessment.

The following steps must be followed:

1. Identify the reason for restoration.
    
2. Determine the required recovery point.
    
3. Obtain management authorization.
    
4. Coordinate with the PMS vendor or authorized database administrator.
    
5. Confirm the availability and integrity of the backup.
    
6. Perform restoration according to the approved recovery procedure.
    
7. Verify system functionality and data consistency.
    
8. Obtain confirmation from the relevant operational department.
    
9. Record the restoration activity.
    

## 9. PMS DOWNTIME MANAGEMENT

PMS downtime can directly affect reservations, guest check-in, check-out, room allocation and billing activities.

The IT department must follow a controlled downtime management process.

### 9.1 Initial Response

1. Identify whether the outage affects one workstation, multiple users or the entire hotel.
    
2. Determine whether the issue is related to network infrastructure, application services, database services or the PMS provider.
    
3. Record the start time of the interruption.
    
4. Inform the IT Manager.
    
5. Notify affected departments through the approved communication channel.
    
6. Contact the PMS vendor if the issue is application-related or outside IT's control.
    

### 9.2 Operational Coordination

During downtime:

- Inform the Front Office Manager and other affected department heads.
    
- Ensure that the hotel follows its approved PMS downtime procedure.
    
- Coordinate with authorized operational personnel for manual records where required.
    
- Ensure that sensitive guest and financial information is protected.
    
- Avoid duplicate or unauthorized transactions during manual operations.
    

### 9.3 System Restoration

After PMS services are restored:

1. Confirm system availability.
    
2. Test login functionality.
    
3. Verify critical modules.
    
4. Check relevant interfaces and integrations.
    
5. Coordinate with Front Office and other departments for pending transaction reconciliation.
    
6. Confirm that authorized personnel have completed necessary manual data updates.
    
7. Record the restoration time.
    
8. Close the incident after obtaining appropriate confirmation.
    

**Note:** IT personnel must not independently create, modify or reconcile guest reservations, room charges or financial transactions unless specifically authorized and trained to do so.

## 10. PMS SECURITY MANAGEMENT

The IT department must ensure that PMS access and technical infrastructure follow the hotel's information security requirements.

Minimum security practices include:

- Individual user accounts.
    
- Role-based access control.
    
- Strong password requirements.
    
- Multi-factor authentication wherever supported.
    
- Periodic access reviews.
    
- Immediate deactivation of unauthorized or unnecessary accounts.
    
- Restricted administrative privileges.
    
- Secure remote vendor access.
    
- Protection of guest and financial information.
    
- Monitoring of relevant security logs.
    
- Timely security updates in coordination with the vendor.
    
- Prohibition of unauthorized software installation.
    

Administrative accounts must be restricted to authorized personnel.

Vendor remote access must be approved, time-limited where possible, monitored and disabled after the support requirement is completed.

## 11. PMS VENDOR COORDINATION

The IT department must maintain proper coordination with the PMS service provider.

The following information should be maintained:

- Vendor name and contact details.
    
- Support email address and telephone number.
    
- Customer or property identification.
    
- Contract and AMC details, where applicable.
    
- Support coverage and service hours.
    
- Escalation contacts.
    
- System hosting and infrastructure details.
    
- Integration information.
    
- Current software version.
    
- Known issues and pending tickets.
    

For every vendor complaint:

1. Register the issue internally.
    
2. Create a vendor support ticket.
    
3. Record the vendor ticket reference.
    
4. Provide relevant technical details.
    
5. Track progress.
    
6. Escalate unresolved critical issues.
    
7. Verify the resolution.
    
8. Maintain closure records.
    

## 12. PMS DOCUMENTATION AND RECORD MANAGEMENT

The IT department must maintain the following records:

|Record|Purpose|
|---|---|
|PMS User Access Register|User account and permission tracking|
|PMS Incident Register|Complaint and issue tracking|
|PMS Downtime Register|Outage and recovery records|
|PMS Vendor Support Register|Vendor complaint tracking|
|PMS Change Log|Configuration and software change history|
|PMS Backup Verification Log|Backup monitoring|
|PMS Maintenance Log|Preventive and corrective maintenance|
|PMS Integration Register|Connected systems and interface details|

All records must be maintained in an approved, access-controlled location according to hotel retention requirements.

Passwords, authentication secrets and sensitive guest information must never be stored in ordinary registers or unsecured documents.

## 13. PREVENTIVE MAINTENANCE

The IT team must follow a preventive maintenance schedule based on system architecture, vendor recommendations and operational requirements.

Suggested activities:

**Daily**

- Check PMS availability.
    
- Review reported technical issues.
    
- Check critical integration status.
    
- Review backup status where accessible.
    

**Weekly**

- Review recurring complaints.
    
- Check unresolved vendor tickets.
    
- Review system and application error logs where accessible.
    
- Check server or cloud service alerts.
    

**Monthly**

- Review user access changes.
    
- Review system performance.
    
- Verify backup monitoring records.
    
- Review pending application updates.
    
- Review vendor support issues.
    

**Quarterly**

- Conduct a detailed access review with department heads.
    
- Review vendor escalation details.
    
- Verify documented recovery procedures.
    
- Review recurring incidents and improvement opportunities.
    

Actual frequency may be adjusted according to vendor recommendations, system architecture and hotel operational requirements.

## 14. INCIDENT ESCALATION MATRIX

The following is a suggested escalation framework. Actual response targets should be established through hotel policy and vendor support agreements.

|Priority|Example|Escalation|
|---|---|---|
|Critical|Complete PMS outage affecting hotel operations|IT Manager, PMS Vendor, Hotel Management|
|High|Multiple users or critical PMS modules unavailable|IT Manager, PMS Vendor|
|Medium|Individual module or workstation issue|IT Executive, IT Manager|
|Low|Minor user assistance or non-critical configuration request|IT Support Team|

For security incidents involving suspected unauthorized access, data exposure or compromised accounts, the IT Manager and designated information security or management representatives must be notified immediately.

## 15. PMS PERFORMANCE MONITORING

The IT Manager should periodically review the following operational indicators:

- PMS availability and downtime.
    
- Number of PMS-related incidents.
    
- Average incident resolution time.
    
- Number of recurring technical complaints.
    
- Pending vendor support tickets.
    
- Backup success rate, where measurable.
    
- User access review completion.
    
- Critical interface failure frequency.
    
- Preventive maintenance completion.
    

These indicators should be reviewed to identify operational weaknesses and opportunities for improvement.

## 16. STANDARD PMS OPERATIONS CHECKLIST

### Daily PMS Checklist

- PMS application availability verified.
    
- Login functionality checked.
    
- Critical PMS modules accessible.
    
- PMS workstation connectivity checked.
    
- Critical integrations reviewed.
    
- Backup status checked where applicable.
    
- Reported PMS complaints reviewed.
    
- Critical vendor alerts reviewed.
    
- Pending critical incidents escalated.
    
- Daily checks recorded.
    

### Monthly PMS Checklist

- User access review completed.
    
- Unauthorized or inactive accounts reviewed.
    
- Pending software updates reviewed.
    
- Vendor support tickets reviewed.
    
- Backup monitoring records verified.
    
- Recovery arrangements reviewed.
    
- PMS documentation updated.
    
- Recurring issues analyzed.
    
- Monthly PMS performance reviewed.
    

## 17. HOTEL-SPECIFIC IMPLEMENTATION NOTES

This SOP provides a common operational framework. Certain activities may differ depending on the PMS platform and hotel infrastructure.

Examples:

- Cloud PMS platforms may not provide direct server or database administration access to hotel IT personnel.
    
- On-premises PMS platforms may require local server, database and application service monitoring.
    
- Some PMS platforms provide integrated user management, while others require vendor assistance.
    
- Backup responsibilities may belong to the hotel, PMS vendor or cloud service provider.
    
- Certain interfaces may be managed by third-party vendors.
    
- Administrative permissions and available monitoring features may vary by software platform.
    

The IT Manager must document these differences in the hotel's PMS technical documentation without compromising the minimum controls established by this SOP.

## 18. COMPLIANCE AND EXCEPTIONS

All IT personnel involved in PMS support must follow this SOP and the applicable hotel information security policies.

Any exception must be documented, justified and approved by the appropriate management authority.

Unauthorized system access, unapproved configuration changes, sharing of credentials and disclosure of guest information are strictly prohibited.

Applicable privacy, cybersecurity, contractual and regulatory requirements must also be followed.

## 19. REVIEW AND REVISION HISTORY

This SOP must be reviewed annually or whenever significant changes occur in PMS technology, hotel operations, security requirements or applicable regulations.

|Version|Date|Description|Prepared By|
|---|---|---|---|
|1.0|Initial Issue|First release|IT Department|

**Document End**

**Disclaimer:** This is a general hotel IT operations template. Each hotel should validate its implementation against its PMS vendor documentation, contractual responsibilities, internal policies and applicable legal requirements.