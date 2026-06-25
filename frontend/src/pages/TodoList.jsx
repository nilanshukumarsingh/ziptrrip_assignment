import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [edit, setEdit] = useState({ id: null, title: "", description: "" });

  const load = () => api.get("/todos").then((r) => setTodos(r.data));
  useEffect(() => {
    load();
  }, []);

  const add = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    api.post("/todos", form).then(() => {
      setForm({ title: "", description: "" });
      load();
    });
  };

  const toggle = (t) => api.put(`/todos/${t.id}`, { done: !t.done }).then(load);
  const remove = (id) => api.delete(`/todos/${id}`).then(load);
  const saveEdit = (id) =>
    api.put(`/todos/${id}`, edit).then(() => {
      setEdit({ id: null });
      load();
    });

  return (
    <div className="container">
      <h1>📝 Notes</h1>
      <p>
        {todos.length} total | {todos.filter((t) => t.done).length} done
      </p>

      <form onSubmit={add}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {todos.map((t) => (
          <div key={t.id} className="card">
            {edit.id === t.id ? (
              <>
                <input
                  value={edit.title}
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                />
                <textarea
                  value={edit.description}
                  onChange={(e) =>
                    setEdit({ ...edit, description: e.target.value })
                  }
                />
                <button onClick={() => saveEdit(t.id)}>Save</button>
                <button onClick={() => setEdit({ id: null })}>Cancel</button>
              </>
            ) : (
              <>
                <h3>
                  <Link
                    to={`/todo?id=${t.id}`}
                    style={{
                      color: t.done ? "gray" : "white",
                      textDecoration: t.done ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </Link>
                </h3>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t)}
                />
                <p style={{ color: t.done ? "gray" : "#ccc" }}>
                  {t.description}
                </p>
                <small>{new Date(t.createdAt).toLocaleDateString()}</small>
                <button
                  onClick={() =>
                    setEdit({
                      id: t.id,
                      title: t.title,
                      description: t.description || "",
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => remove(t.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default TodoList;
