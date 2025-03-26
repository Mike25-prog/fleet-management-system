const express = require("express");
const { initiateSTKPush } = require("./mpesaService");
const router = express.Router();

router.post("/stkpush", async (req, res) => {
    const { phoneNumber, amount, orderID } = req.body;

    if (!phoneNumber || !amount || !orderID) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const result = await initiateSTKPush(phoneNumber, amount, orderID);
        res.json({ message: "STK Push sent successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
