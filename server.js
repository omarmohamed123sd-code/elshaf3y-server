const express = require("express");
const app = express();

// عشان يقرأ JSON
app.use(express.json());

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.send("Server is working ✅");
});

// 🔥 ليست المفاتيح
let keys = [
    "omar2026",
    "vip123",
    "testkey"
];

// 🔥 تحقق من الكي
app.post("/check", (req, res) => {
    const { key } = req.body;

    if (!key) {
        return res.json({ status: "invalid", msg: "no key" });
    }

    if (keys.includes(key)) {
        return res.json({ status: "valid" });
    }

    res.json({ status: "invalid" });
});

// 🔥 إضافة كي (اختياري)
app.post("/add", (req, res) => {
    const { key } = req.body;

    if (!key) {
        return res.json({ status: "error" });
    }

    keys.push(key);
    res.json({ status: "added" });
});

// 🔥 حذف كي (اختياري)
app.post("/remove", (req, res) => {
    const { key } = req.body;

    keys = keys.filter(k => k !== key);
    res.json({ status: "removed" });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
