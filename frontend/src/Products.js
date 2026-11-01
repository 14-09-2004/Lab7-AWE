import React, { useState, useEffect } from "react";

const GRAPHQL_URL = "http://localhost:4000/";

const LIST_PRODUCTS = `query { products { id name price } }`;
const ADD_PRODUCT = `
  mutation AddProduct($name: String!, $price: Float!) {
    addProduct(name: $name, price: $price) { id name price }
  }
`;

async function graphql(query, variables) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  // List all products (GraphQL query)
  useEffect(() => {
    graphql(LIST_PRODUCTS)
      .then((data) => setProducts(data.products))
      .catch(() => setError("Could not load products. Is the GraphQL server running on port 4000?"));
  }, []);

  // Add a product (GraphQL mutation)
  const addProduct = async (e) => {
    e.preventDefault();
    if (!name.trim() || price === "") {
      setError("Please enter a product name and price.");
      return;
    }
    try {
      const data = await graphql(ADD_PRODUCT, { name: name.trim(), price: parseFloat(price) });
      setProducts([...products, data.addProduct]);
      setName("");
      setPrice("");
      setError("");
    } catch (err) {
      setError("Could not add the product.");
    }
  };

  return (
    <div className="box">
      <h2>Products</h2>
      <form onSubmit={addProduct} className="row">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" />
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <button type="submit" className="btn primary">Add</button>
      </form>

      {error && <div className="error">{error}</div>}

      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>${p.price.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
