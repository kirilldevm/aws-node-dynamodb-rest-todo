const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.updateTodo = async (event, context, callback) => {
  const data = JSON.parse(event.body || '{}');

  if (typeof data.todo !== 'string' || typeof data.completed !== 'boolean') {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: '"todo" must be a string and "completed" must be a boolean',
      }),
    });
  }

  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression:
      'set #todo = :todo, #completed = :completed, #updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#todo': 'todo',
      '#completed': 'completed',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':todo': data.todo,
      ':completed': data.completed,
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.send(new UpdateCommand(params));
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    });
  } catch (err) {
    console.error(err);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update todo' }),
    });
  }
};
