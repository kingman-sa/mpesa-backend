require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/pay", async (req, res) => {
    try {
        const { amount, phone, reference } = req.body;

        if (!amount || !phone || !reference) {
            return res.status(400).json({
                error: "amount, phone e reference são obrigatórios"
            });
        }

        const response = await axios({
            method: "post",
            url: "https://boldpay-thxc.onrender.com/api/v1/payment/c2b",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "apikey": process.env.API_KEY
            },
            data: {
                amount: amount,
                to: process.env.TO,
                from: phone,
                reference: reference, // 🔥 agora vem do cliente
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
    } catch (err) {
        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Rodando na porta " + (process.env.PORT || 3000));
});
