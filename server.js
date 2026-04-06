const express = require("express");
const app = express();

app.use(express.json());

// 🔑 قائمة المفاتيح
let keys = [
  { key: "123", status: "new", hwid: null },
  { key: "omar2026", status: "new", hwid: null },
  { key: "vip999", status: "new", hwid: null }
];

// test
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// 🔍 check key
app.post("/check-key", (req, res) => {
  const { key, hwid } = req.body;

  const found = keys.find(k => k.key === key);

  if (!found)
    return res.json({ status: "invalid" });

  // أول استخدام
  if (found.status === "new") {
    found.hwid = hwid;
    found.status = "locked";
    return res.json({ status: "valid" });
  }

  // نفس الجهاز
  if (found.hwid === hwid)
    return res.json({ status: "valid" });

  // جهاز مختلف
  return res.json({ status: "invalid" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});
