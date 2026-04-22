# AWS Node Todo API

Serverless Todo CRUD API built with Node.js, AWS Lambda, API Gateway, and DynamoDB.

## Tech Stack

- Node.js 20
- Serverless Framework v4
- AWS Lambda + API Gateway (REST)
- DynamoDB
- AWS SDK v3 (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`)

## Features

- Create todo
- List todos
- Get todo by ID
- Update todo
- Delete todo

## Project Structure

- `serverless.yml` - infrastructure and function routing
- `handler/createTodo.js` - create todo
- `handler/listTodos.js` - list all todos
- `handler/getTodo.js` - get one todo by `id`
- `handler/updateTodo.js` - update todo fields
- `handler/deleteTodo.js` - delete todo by `id`

## Prerequisites

- Node.js 20+
- AWS account + credentials configured locally
- Serverless Framework v4 installed and authenticated

## Installation

```bash
npm install
```

## Deploy

```bash
sls deploy
```

After deploy, Serverless prints your API endpoints.

Default stage is `dev`.

## Environment / Resources

- DynamoDB table name pattern: `todos-table-${sls:stage}`
- Lambda env var: `TODO_TABLE`
- DynamoDB primary key: `id` (string)

## API Endpoints

Base URL (example):

`https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev`

### Create Todo

`POST /todos`

Request:

```json
{
  "todo": "buy milk"
}
```

Example:

```bash
curl -X POST "https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev/todos" \
  -H "Content-Type: application/json" \
  -d "{\"todo\":\"buy milk\"}"
```

### List Todos

`GET /todos`

Example:

```bash
curl "https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev/todos"
```

### Get Todo

`GET /todos/{id}`

Example:

```bash
curl "https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev/todos/<todo-id>"
```

### Update Todo

`PUT /todos/{id}`

Request:

```json
{
  "todo": "buy bread",
  "completed": true
}
```

Example:

```bash
curl -X PUT "https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev/todos/<todo-id>" \
  -H "Content-Type: application/json" \
  -d "{\"todo\":\"buy bread\",\"completed\":true}"
```

### Delete Todo

`DELETE /todos/{id}`

Example:

```bash
curl -X DELETE "https://7k2id6mhz3.execute-api.us-east-1.amazonaws.com/dev/todos/<todo-id>"
```

## Common Issues

- `{"message":"Missing Authentication Token"}`:
  - Wrong HTTP method or wrong path/stage.
  - Example: opening endpoint in browser sends `GET` by default.
- `{"message":"Internal server error"}`:
  - Check Lambda logs:
    ```bash
    sls logs -f <function-name> --stage dev --region us-east-1
    ```

## Useful Commands

```bash
sls deploy
sls remove
sls logs -f create --stage dev --region us-east-1
```
