import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SupportTickets')

def lambda_handler(event, context):

    email = event['queryStringParameters']['email']

    response = table.query(
        IndexName='email-index',
        KeyConditionExpression=Key('email').eq(email)
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(response['Items'])
    }