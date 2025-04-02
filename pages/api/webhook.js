// pages/api/webhook.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Webhook received successfully' });
}
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB Atlas (mongodb+srv://aprentice:<db_password>@cluster0.uarhn3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// simple webhook endpoint to store data
app.post('/webhook', async (req, res) => {
  const flightData = req.body;

  // store flightData in MongoDB here later
  
  res.status(200).send('Webhook received!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook ready');
});
