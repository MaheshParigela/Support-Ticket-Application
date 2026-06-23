import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SupportTickets')

def lambda_handler(event, context):

    response = table.scan()

    items = response.get('Items', [])

    total = len(items)

    open_tickets = len([
        item for item in items
        if item.get('status') == 'OPEN'
    ])

    resolved = len([
        item for item in items
        if item.get('status') == 'RESOLVED'
    ])

    high_priority = len([
        item for item in items
        if item.get('priority') == 'HIGH'
    ])

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'total': total,
            'open': open_tickets,
            'resolved': resolved,
            'high': high_priority
        })
    }