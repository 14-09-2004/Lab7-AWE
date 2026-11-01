# SED312 - Lab 7: Full-Stack App with React, Express.js, raw Node.js and GraphQL

A To-Do list full-stack application plus a React + raw Node.js integration and a GraphQL Products example.

## Project structure
| Folder | What it contains | Port |
|---|---|---|
| `express-backend/` | Express.js REST API for To-Do items (GET, POST, PUT, DELETE, CORS, duplicate check with 409) | 5000 |
| `raw-backend/` | Server written with the built-in `http` module, route `/api/info` | 5000 |
| `graphql-backend/` | Apollo Server with a `Product` type, `products` query and `addProduct` mutation | 4000 |
| `frontend/` | React app (`TodoApp`, `InfoMessage`, `Products`) using Axios / fetch | 3000 |

## How to run
Run each part in its own terminal.

```bash
# Express backend (Parts 1 and 2)
cd express-backend
npm install
npm start

# OR raw Node.js backend (Part 3) - uses the same port 5000, so stop Express first
cd raw-backend
node server.js

# GraphQL backend (Part 4)
cd graphql-backend
npm install
npm start

# React frontend
cd frontend
npm install
npm run dev        # opens http://localhost:3000
```

## API (Express)
| Method | Route | Success | Errors |
|---|---|---|---|
| GET | `/todos` | 200 | |
| POST | `/todos` | 201 | 400 empty task, 409 duplicate task |
| PUT | `/todos/:id` | 200 | 400 invalid body, 404 not found, 409 duplicate |
| DELETE | `/todos/:id` | 204 | 400 invalid id, 404 not found |

## GraphQL examples
```graphql
query { products { id name price } }

mutation { addProduct(name: "Mouse", price: 19.99) { id name price } }
```
