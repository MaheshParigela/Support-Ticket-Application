import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SupportTickets')

sns = boto3.client('sns')

TOPIC_ARN = "arn:aws:sns:ap-south-1:150105760180:My-Ticket-alerts"

def lambda_handler(event, context):

    body = json.loads(event['body'])

    ticket_id = body['ticket_id']
    status = body['status']

    # Get existing ticket details

    response = table.get_item(
        Key={
            'ticket_id': ticket_id
        }
    )

    ticket = response.get('Item', {})

    customer_name = ticket.get('customer_name', 'Customer')
    email = ticket.get('email', 'N/A')
    priority = ticket.get('priority', 'N/A')

    # Update ticket status

    table.update_item(
        Key={
            'ticket_id': ticket_id
        },
        UpdateExpression='SET #s = :s',
        ExpressionAttributeNames={
            '#s': 'status'
        },
        ExpressionAttributeValues={
            ':s': status
        }
    )

    # Send SNS Notification

    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject=f"Ticket Status Updated - {ticket_id}",
        Message=f"""
Ticket Status Updated

Ticket ID: {ticket_id}

Customer: {customer_name}

Email: {email}

Priority: {priority}

New Status: {status}

Thank you for using Support Portal.
"""
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': 'Ticket updated successfully'
        })
    }