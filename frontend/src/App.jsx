import { useEffect } from "react";
import api from "./api";

function App() {
  useEffect(() => {
    api.get("/").then((res) => console.log(res.data));
  }, []);

  return <h1>Todo App</h1>;
}

export default App;
