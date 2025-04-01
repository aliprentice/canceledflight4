import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, index: true },
  airline: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  scheduledDeparture: { type: Date, required: true },
  status: { type: String, required: true },
  reason: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Check if the model already exists to prevent overwriting
const Flight = mongoose.models.Flight || mongoose.model('Flight', FlightSchema);

export default Flight;
