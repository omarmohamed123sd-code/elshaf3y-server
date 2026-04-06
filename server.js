const express = require("express");
const app = express();

app.use(express.json());

// 🔑 keys + hwid
let keys = [
  { key: "123", status: "new", hwid: null },
  { key: "abc", status: "new", hwid: null }
];

// test
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// 🔍 check key + hwid
app.post("/check-key", (req, res) => {
  const { key, hwid } = req.body;

  const found = keys.find(k => k.key === key);

  if (!found)
    return res.json({ status: "invalid" });

  // أول مرة
  if (found.status === "new") {
    found.hwid = hwid;
    found.status = "locked";
    return res.json({ status: "valid" });
  }

  // بعد كده لازم نفس الجهاز
  if (found.hwid !== hwid)
    return res.json({ status: "invalid", message: "wrong device" });

  return res.json({ status: "valid" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
