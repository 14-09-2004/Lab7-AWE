const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// Schema: Product type, a query to list products and a mutation to add one
const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product!
  }
`;

let products = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Headphones", price: 59.5 },
];
let nextId = 3;

const resolvers = {
  Query: {
    products: () => products,
  },
  Mutation: {
    addProduct: (_, { name, price }) => {
      const product = { id: String(nextId++), name, price };
      products.push(product);
      return product;
    },
  },
};

async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`GraphQL server ready at ${url}`);
}

main();
