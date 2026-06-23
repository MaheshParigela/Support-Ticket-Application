import json
import uuid
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SupportTickets')

sns = boto3.client('sns')

SNS_TOPIC_ARN = "YOUR_SNS_TOPIC_ARN"


def lambda_handler(event, context):

    body = json.loads(event['body'])

    customer_name = body['customer_name']
    email = body['email']
    issue = body['issue']
    priority = body['priority']

    ticket_id = str(uuid.uuid4())

    category = categorize_ticket(issue)

    item = {
        "ticket_id": ticket_id,
        "customer_name": customer_name,
        "email": email,
        "issue": issue,
        "priority": priority,
        "category": category,
        "status": "OPEN",
        "created_at": datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    if priority.upper() == "HIGH":

        sns.publish(
            TopicArn=SNS_TOPIC_ARN,
            Subject="High Priority Ticket",
            Message=f"""
Ticket ID: {ticket_id}

Customer: {customer_name}

Issue:
{issue}
"""
        )

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "message": "Ticket Created",
            "ticket_id": ticket_id,
            "category": category
        })
    }


def categorize_ticket(issue):

    issue = issue.lower()

    if "login" in issue:
        return "Authentication"

    elif "payment" in issue:
        return "Billing"

    elif "database" in issue:
        return "Database"

    elif "api" in issue:
        return "API"

    return "General"