import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import SingleTodo from "./pages/SingleTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todo" element={<SingleTodo />} />
    </Routes>
  );
}
export default App;
