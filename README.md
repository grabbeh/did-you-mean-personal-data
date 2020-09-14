# Did you mean personal data slackbot

Remind colleagues of the importance of the difference between PII and personal data by delegating to a slackbot.

# Development

To configure for development use, you'll need to:

- create a Slack app at api.slack.com
- have an AWS account configured for access to a DynamoDb instance

and add credentials to .env file in the following format.

````
SLACK_TOKEN=''
SLACK_SIGNING_SECRET=''
SLACK_VERIFICATION_TOKEN=''
SLACK_CLIENT_ID=''
SLACK_CLIENT_SECRET=''
AWS_ACCESS_KEY_ID=''
AWS_SECRET_ACCESS_KEY=''```
````

You'll also need to set up an account to allow tunnelling of your localhost to a publicly available URL. Ngrok is a popular choice!

DynamoDB is used to store installations and state to verify OAUTH requests. No other data is stored. Is it personal data though? Maybeeee.
