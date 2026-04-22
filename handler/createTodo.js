const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { randomUUID } = require('crypto');

const {
  DynamoDBDocumentClient,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.createTodo = async (event, context, callback) => {
  const data = JSON.parse(event.body || '{}');

  if (typeof data.todo !== 'string' || data.todo.trim() === '') {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error: '"todo" must be a non-empty string' }),
    });
  }

  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: randomUUID(),
      todo: data.todo,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    const command = new PutCommand(params);
    await dynamoDb.send(command);

    return callback(null, {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    });
  } catch (error) {
    console.error(error);
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create todo' }),
    });
  }
};
