import React, { useState } from "react";
import TodoApp from "./TodoApp.js";
import InfoMessage from "./InfoMessage.js";
import Products from "./Products.js";

function App() {
  const [tab, setTab] = useState("todo");

  return (
    <div className="container">
      <h1>SED312 - Lab 7</h1>
      <div className="tabs">
        <button className={tab === "todo" ? "tab active" : "tab"} onClick={() => setTab("todo")}>To-Do (Express)</button>
        <button className={tab === "info" ? "tab active" : "tab"} onClick={() => setTab("info")}>Message (Raw Node.js)</button>
        <button className={tab === "products" ? "tab active" : "tab"} onClick={() => setTab("products")}>Products (GraphQL)</button>
      </div>

      {tab === "todo" && <TodoApp />}
      {tab === "info" && <InfoMessage />}
      {tab === "products" && <Products />}
    </div>
  );
}

export default App;
