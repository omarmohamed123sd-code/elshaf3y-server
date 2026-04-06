const express = require("express");
const app = express();

app.use(express.json());

// 👤 users
let users = [
  { username: "omar", password: "1234", key: "123", status: "valid" },
  { username: "ali", password: "1111", key: "abc", status: "valid" }
];

// test
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// 🔐 login
app.post("/login", (req, res) => {
  const { username, password, key } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password && u.key === key
  );

  if (!user)
    return res.json({ status: "invalid" });

  if (user.status === "used")
    return res.json({ status: "invalid", message: "key used" });

  user.status = "used";

  return res.json({ status: "valid" });
});

// ➕ add user
app.post("/add-user", (req, res) => {
  const { username, password, key } = req.body;

  users.push({ username, password, key, status: "valid" });

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
