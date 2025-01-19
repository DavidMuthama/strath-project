// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { predict } = require('./model.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// API Endpoint to get predictions
app.post('/predict', async (req, res) => {
    const inputData = req.body;
    try {
        const prediction = await predict(inputData);
        res.json({ success: true, prediction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
