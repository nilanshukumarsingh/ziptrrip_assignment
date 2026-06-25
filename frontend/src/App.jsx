import { useEffect } from "react";
import api from "./api";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos").then((res) => setTodos(res.data));
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default App;
