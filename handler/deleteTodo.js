const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.deleteTodo = async (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Todo deleted successfully' }),
    });
  } catch (err) {
    console.error(err);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete todo' }),
    });
  }
};
