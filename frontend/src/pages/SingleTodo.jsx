import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function SingleTodo() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    api
      .get(`/todos/${id}`)
      .then((r) => {
        setTodo(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  if (!todo)
    return (
      <div className="container">
        <p>Note not found.</p> <Link to="/">← Back to list</Link>
      </div>
    );

  const toggle = () =>
    api.put(`/todos/${id}`, { done: !todo.done }).then((r) => setTodo(r.data));
  const remove = () => api.delete(`/todos/${id}`).then(() => navigate("/"));

  const dateStr = todo.createdAt
    ? new Date(todo.createdAt).toLocaleString()
    : "N/A";

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to list
      </Link>

      <div className="todo-detail note-detail">
        <h1>{todo.title}</h1>
        {todo.description && (
          <div className="note-body">
            <p>{todo.description}</p>
          </div>
        )}

        <div className="note-meta">
          <p>
            Status: <strong>{todo.done ? "✅ Done" : "⏳ Pending"}</strong>
          </p>
          <p>Created: {dateStr}</p>
          <p className="todo-id">ID: {todo.id}</p>
        </div>

        <div className="detail-actions">
          <button onClick={toggle} className="btn-toggle">
            {todo.done ? "Mark Pending" : "Mark Done"}
          </button>
          <button onClick={remove} className="btn-delete">
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleTodo;
