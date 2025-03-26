// const axios = require("axios");
// const dotenv = require("dotenv");

// dotenv.config();

// const MPESA_BASE_URL = process.env.MPESA_BASE_URL;
// const CONSUMER_KEY = process.env.CONSUMER_KEY;
// const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// /** 🔹 1. Get OAuth Token */
// async function getOAuthToken() {
//     try {
//         const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

//         const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
//             headers: { Authorization: `Basic ${auth}` },
//         });

//         return response.data.access_token;
//     } catch (error) {
//         console.error("Error getting OAuth token:", error.response ? error.response.data : error);
//         throw new Error("Failed to get OAuth token");
//     }
// }

// /** 🔹 2. Initiate STK Push */
// async function initiateSTKPush(phoneNumber, amount, orderID) {
//     try {
//         const accessToken = await getOAuthToken();
//         const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").substring(0, 14);
// console.log("Fixed Timestamp:", timestamp);

//         const password = Buffer.from(`${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString("base64");

//         const requestBody = {
//             BusinessShortCode: process.env.BUSINESS_SHORTCODE,
//             Password: password,
//             Timestamp: timestamp,
//             TransactionType: "CustomerPayBillOnline",
//             Amount: amount,
//             PartyA: phoneNumber,
//             PartyB: process.env.BUSINESS_SHORTCODE,
//             PhoneNumber: phoneNumber,
//             CallBackURL: process.env.CALLBACK_URL,
//             AccountReference: `TRIP_${orderID}`,
//             TransactionDesc: "Trip Payment",
//         };

//         const response = await axios.post(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, requestBody, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         return response.data;
//     } catch (error) {
//         console.error("STK Push error:", error.response ? error.response.data : error);
//         throw new Error("Failed to initiate STK Push");
//     }
// }

// module.exports = { initiateSTKPush };




















const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure this points to your database connection

router.post("/stk_callback", async (req, res) => {
    const callbackData = req.body;

    // Check if payment was successful
    if (callbackData.Body.stkCallback.ResultCode === 0) {
        const details = callbackData.Body.stkCallback.CallbackMetadata.Item;

        // Extract payment details
        const transaction = {
            mpesa_receipt: details.find(item => item.Name === "MpesaReceiptNumber")?.Value,
            amount: details.find(item => item.Name === "Amount")?.Value,
            phone_number: details.find(item => item.Name === "PhoneNumber")?.Value,
            transaction_date: details.find(item => item.Name === "TransactionDate")?.Value,
            checkout_request_id: callbackData.Body.stkCallback.CheckoutRequestID
        };

        // Store in database (Insert into payments table)
        const insertQuery = `INSERT INTO payments (mpesa_receipt, amount, phone_number, transaction_date, checkout_request_id)
                             VALUES (?, ?, ?, ?, ?)`;

        db.query(insertQuery, [
            transaction.mpesa_receipt,
            transaction.amount,
            transaction.phone_number,
            transaction.transaction_date,
            transaction.checkout_request_id
        ], (err, results) => {
            if (err) {
                console.error("Database Error: ", err);
                return res.status(500).json({ error: "Failed to save payment" });
            }
            console.log("Payment saved successfully:", results);
            res.json({ message: "Payment recorded successfully", data: transaction });
        });
    } else {
        console.log("STK Push Payment Failed:", callbackData);
        res.status(400).json({ error: "Payment failed" });
    }
}),

router.get("/receipt/:mpesa_receipt", (req, res) => {
  const { mpesa_receipt } = req.params;

  const query = "SELECT * FROM payments WHERE mpesa_receipt = ?";
  db.query(query, [mpesa_receipt], (err, results) => {
      if (err) {
          console.error("Database Error: ", err);
          return res.status(500).json({ error: "Failed to fetch payment details" });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: "Receipt not found" });
      }
      res.json({ receipt: results[0] });
  });
});


module.exports = router;
