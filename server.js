const express = require("express");
const app = express();

app.use(express.json());

// 🔑 داتا تجريبية
let keys = [
  { key: "123", status: "valid" },
  { key: "abc", status: "valid" },
  { key: "test", status: "used" }
];

// 🔍 check key
app.post("/check-key", (req, res) => {
  const { key } = req.body;

  const found = keys.find(k => k.key === key);

  if (!found)
    return res.json({ status: "invalid" });

  if (found.status === "used")
    return res.json({ status: "invalid", message: "already used" });

  // 🔐 يقفله بعد الاستخدام
  found.status = "used";

  return res.json({ status: "valid" });
});

// ➕ add key
app.post("/add-key", (req, res) => {
  const { key } = req.body;

  keys.push({ key, status: "valid" });

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running"));
