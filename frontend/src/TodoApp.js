import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/todos";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  // View all To-Do items
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTodos(res.data))
      .catch(() => setError("Could not load To-Dos. Is the Express server running on port 5000?"));
  }, []);

  // Add a new To-Do item
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, { task });
      setTodos([...todos, res.data.todo]);
      setTask("");
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("This task already exists. Please enter a different task.");
      } else if (err.response && err.response.status === 400) {
        setError("Please type a task first.");
      } else {
        setError("Something went wrong while adding the task.");
      }
    }
  };

  // Mark a To-Do item as completed (or not completed)
  const toggleTodo = async (todo) => {
    try {
      const res = await axios.put(`${API_URL}/${todo.id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === todo.id ? res.data.todo : t)));
    } catch (err) {
      setError("Could not update the task.");
    }
  };

  // Delete a To-Do item
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError("Could not delete the task.");
    }
  };

  return (
    <div className="box">
      <h2>My To-Do List</h2>

      <form onSubmit={addTodo} className="row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit" className="btn primary">Add</button>
      </form>

      {error && <div className="error">{error}</div>}

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "done" : ""}>
            <span>{todo.task}</span>
            <span>
              <button className="btn success" onClick={() => toggleTodo(todo)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button className="btn danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
      {todos.length === 0 && !error && <p className="muted">No tasks yet.</p>}
    </div>
  );
}

export default TodoApp;
