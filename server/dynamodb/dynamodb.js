const dotenv = require('dotenv')
const AWS = require('aws-sdk')
dotenv.config({ path: '../../.env' })
AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

const storeInstall = async (teamId, content) => {
  let params = {
    TableName: 'PIICLIPPYv1',
    Item: {
      PK: teamId,
      SK: `TEAM#${teamId}`,
      ...content
    }
  }

  try {
    await docClient.put(params).promise()
    return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) }
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    }
  }
}

const fetchInstall = async teamId => {
  const params = {
    TableName: 'PIICLIPPYv1',
    // give nicknames to the partition and sort keys
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK'
    },
    // use nicknames and values for nicknames
    KeyConditionExpression: '#pk = :pk AND #sk = :sk',
    // define values for the actual values of the nicknames
    ExpressionAttributeValues: {
      ':pk': teamId,
      ':sk': `TEAM#${teamId}`
    }
  }

  try {
    const data = await docClient.query(params).promise()
    return data.Items[0]
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    }
  }
}

const saveState = async (stateId, content) => {
  let params = {
    TableName: 'PIICLIPPYv1',
    Item: {
      PK: stateId,
      SK: `STATE#${stateId}`,
      ...content
    }
  }

  try {
    await docClient.put(params).promise()
    return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) }
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    }
  }
}

const getState = async stateId => {
  const params = {
    TableName: 'PIICLIPPYv1',
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK'
    },
    KeyConditionExpression: '#pk = :pk AND #sk = :sk',
    ExpressionAttributeValues: {
      ':pk': stateId,
      ':sk': `STATE#${stateId}`
    }
  }

  try {
    const data = await docClient.query(params).promise()
    return data.Items[0]
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    }
  }
}

module.exports = {
  storeInstall,
  fetchInstall,
  saveState,
  getState
}
