const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define a simple Flight schema to store test data
const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departureAirport: String,
  arrivalAirport: String,
  scheduledTime: Date,
  status: String
});

// Model for saving data to MongoDB
const Flight = mongoose.model('Flight', flightSchema);

// Webhook endpoint to test MongoDB saving
app.post('/webhook', async (req, res) => {
  try {
    const flightData = new Flight(req.body);
    await flightData.save();
    console.log('Saved to MongoDB:', flightData);
    res.status(200).send('Webhook received and data saved to MongoDB!');
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
    res.status(500).send('Error saving data to MongoDB.');
  }
});

// Server listens automatically on Vercel
app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook server ready');
});
