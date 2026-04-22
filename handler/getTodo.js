const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.getTodo = async (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const data = await dynamoDb.send(new GetCommand(params));
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    });
  } catch (err) {
    console.error(err);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not get todo' }),
    });
  }
};
