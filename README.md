# 🎫 AWS Enterprise Support Ticket System

## 📌 Project Overview

AWS Enterprise Support Ticket System is a fully serverless cloud-native application designed to manage customer support tickets efficiently.

The solution enables users to register, authenticate, create support tickets, track ticket status, and receive email notifications while allowing administrators to manage ticket workflows through a centralized dashboard.

The application is built entirely on AWS using a serverless architecture, eliminating the need for traditional infrastructure management.

---

# 🚀 Live Architecture

User → CloudFront → S3 Website → Cognito Authentication → API Gateway → Lambda → DynamoDB → SNS → Email Notifications

---

# 🏗 Solution Architecture

### Frontend Layer

* Amazon S3 Static Website Hosting
* Amazon CloudFront
* Route53 Custom Domain

### Authentication Layer

* Amazon Cognito User Pool
* Hosted UI Authentication
* User Registration & Login

### API Layer

* Amazon API Gateway

### Compute Layer

* AWS Lambda Functions

### Database Layer

* Amazon DynamoDB

### Notification Layer

* Amazon SNS

---

# ☁ AWS Services Used

| Service            | Purpose                        |
| ------------------ | ------------------------------ |
| Amazon S3          | Static Website Hosting         |
| Amazon CloudFront  | Content Delivery Network       |
| Amazon Route53     | Custom Domain Management       |
| Amazon Cognito     | Authentication & Authorization |
| Amazon API Gateway | REST API Management            |
| AWS Lambda         | Serverless Compute             |
| Amazon DynamoDB    | NoSQL Data Storage             |
| Amazon SNS         | Email Notifications            |

---

# ✨ Features

## User Features

* User Registration
* User Login
* User Logout
* Create Support Ticket
* View Submitted Tickets
* Receive Email Notifications

## Admin Features

* View All Tickets
* Update Ticket Status
* Search Tickets
* Filter Tickets
* Dashboard Analytics

## Notification Features

* High Priority Ticket Alerts
* Ticket Status Change Notifications
* Customer Email Updates

---

# 📂 Project Structure

```text
AWS-Enterprise-Support-Ticket-System/

├── frontend/
│
├── index.html
├── dashboard.html
├── admin.html
├── mytickets.html
│
├── style.css
├── auth.js
├── app.js
├── admin.js
├── mytickets.js
│
├── lambda/
│
├── create_ticket_lambda.py
├── get_tickets_lambda.py
├── get_all_tickets_lambda.py
├── update_ticket_lambda.py
├── dashboard_stats_lambda.py
│
├── architecture-diagram.html
├── deployment-guide.html
├── README.md
│
└── screenshots/
```

---

# 🔧 API Endpoints

| Method | Resource    | Description           |
| ------ | ----------- | --------------------- |
| POST   | /ticket     | Create Support Ticket |
| GET    | /ticket     | Retrieve Tickets      |
| PUT    | /ticket     | Update Ticket Status  |
| GET    | /alltickets | Admin Dashboard Data  |
| GET    | /stats      | Dashboard Analytics   |

---

# ⚙ Lambda Functions

## create_ticket_lambda

Responsibilities:

* Generate Ticket ID
* Categorize Ticket
* Store Ticket in DynamoDB
* Trigger SNS Notifications

---

## get_tickets_lambda

Responsibilities:

* Retrieve Ticket Records
* Return JSON Response

---

## get_all_tickets_lambda

Responsibilities:

* Fetch All Tickets
* Provide Admin Dashboard Data

---

## update_ticket_lambda

Responsibilities:

* Update Ticket Status
* Trigger Status Change Notifications

---

## dashboard_stats_lambda

Responsibilities:

* Calculate Dashboard Metrics
* Generate Analytics Data

---

# 🗄 DynamoDB Design

## Table Name

```text
SupportTickets
```

## Partition Key

```text
ticket_id
```

## Sample Record

```json
{
  "ticket_id": "12345",
  "customer_name": "Mahesh",
  "email": "user@example.com",
  "priority": "HIGH",
  "status": "OPEN",
  "category": "Network",
  "issue": "VPN Connectivity Issue"
}
```

---

# 📧 SNS Notification Workflow

### Ticket Created

```text
User Creates Ticket
       ↓
Lambda
       ↓
SNS Topic
       ↓
Email Notification
```

### Ticket Status Updated

```text
Admin Updates Status
       ↓
Lambda
       ↓
SNS Topic
       ↓
Customer Notification
```

---

# 📊 Dashboard Analytics

The application provides real-time metrics:

* Total Tickets
* Open Tickets
* Resolved Tickets
* High Priority Tickets

Analytics are dynamically generated from DynamoDB using AWS Lambda.

---

# 🔐 Security Controls

* HTTPS via CloudFront
* Amazon Cognito Authentication
* IAM Role Based Lambda Access
* DynamoDB Access Policies
* SNS Publish Permissions
* API Gateway Integration Security

---

# 🧪 Testing Performed

✅ User Registration

✅ User Login

✅ Ticket Creation

✅ DynamoDB Storage Validation

✅ Admin Dashboard Validation

✅ Ticket Status Updates

✅ SNS Notifications

✅ Dashboard Analytics

✅ Search & Filter Operations

---

# ⚠ Current Limitations

* All authenticated users can currently access the Admin Dashboard.
* Cognito Groups are not yet implemented.
* Role Based Access Control (RBAC) is pending.
* User-specific ticket filtering is planned for future releases.

---

# 🚀 Future Enhancements

## Phase 9

* Cognito Groups
* RBAC Implementation

## Phase 10

* User Specific Ticket Visibility

## Phase 11

* Ticket Assignment Workflow

## Phase 12

* CloudWatch Monitoring

## Phase 13

* AWS X-Ray Tracing

## Phase 14

* Attachment Upload Support using Amazon S3

---

# 📚 Documentation

Additional documentation is available in:

* architecture-diagram.html
* deployment-guide.html

---

# 👨‍💻 Author

Mahesh Parigela

AWS Cloud Engineer | Serverless Architecture | DevOps Enthusiast

---

# ⭐ Project Highlights

* Fully Serverless Architecture
* Enterprise Support Workflow
* Real-Time Analytics
* Email Notification System
* Cloud Native Design
* AWS Best Practices
* Production Ready Foundation
