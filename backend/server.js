const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
