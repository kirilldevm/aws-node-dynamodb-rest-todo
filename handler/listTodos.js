const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.listTodos = async (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
  };

  try {
    const data = await dynamoDb.send(new ScanCommand(params));
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    });
  } catch (err) {
    console.error(err);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not list todos' }),
    });
  }
};
