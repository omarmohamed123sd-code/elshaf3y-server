const express = require("express");
const app = express();

app.use(express.json());

// 🔑 keys
let keys = [
  { key: "123", status: "valid" },
  { key: "abc", status: "valid" },
  { key: "test", status: "used" }
];

// test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// 🔍 check key
app.post("/check-key", (req, res) => {
  const { key } = req.body;

  const found = keys.find(k => k.key === key);

  if (!found)
    return res.json({ status: "invalid" });

  if (found.status === "used")
    return res.json({ status: "invalid" });

  found.status = "used";

  return res.json({ status: "valid" });
});

// ➕ add key
app.post("/add-key", (req, res) => {
  const { key } = req.body;

  keys.push({ key, status: "valid" });

  res.json({ success: true });
});

// 🚀 المهم جداً
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
