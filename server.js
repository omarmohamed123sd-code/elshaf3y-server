const express = require("express");
const app = express();

app.use(express.json());

// 🔐 المفاتيح (ممكن تخليها داتابيز بعدين)
let keys = [
    "ELSHAF3Y-123",
    "VIP-999",
    "TEST-KEY"
];

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.send("Server is working 🔥");
});

// 🔑 التحقق من الكي
app.post("/check-key", (req, res) => {
    const { key } = req.body;

    if (keys.includes(key)) {
        return res.json({ status: "valid" });
    } else {
        return res.json({ status: "invalid" });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
