require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/pay", async (req, res) => {
    try {
        const { amount, phone, reference } = req.body;

        if (!amount || !phone) {
            return res.status(400).json({
                error: "amount e phone são obrigatórios"
            });
        }

        // usa reference do cliente ou fallback do servidor
        const finalReference = reference || process.env.REFERENCE;

        const response = await axios({
            method: "post",
            url: "https://weeyapi.onrender.com/api/v1/payment/mpesa",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "apikey": process.env.API_KEY
            },
            data: {
                amount: amount,
                to: process.env.TO,
                from: phone,
                reference: finalReference,
                transaction: Date.now().toString(),
                subject: "Bewise"
            }
        });

        res.json(response.data);

    } catch (err) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Rodando na porta " + (process.env.PORT || 3000));
});
