import mongoose from 'mongoose';

const CanceledFlightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    trim: true
  },
  airline: {
    type: String,
    required: [true, 'Airline name is required'],
    trim: true
  },
  departureAirport: {
    type: String,
    required: [true, 'Departure airport is required'],
    trim: true
  },
  arrivalAirport: {
    type: String,
    required: [true, 'Arrival airport is required'],
    trim: true
  },
  scheduledDeparture: {
    type: Date,
    required: [true, 'Scheduled departure time is required']
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  cancellationTime: {
    type: Date,
    default: Date.now
  },
  webhookData: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Raw data received from webhook'
  }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.CanceledFlight || mongoose.model('CanceledFlight', CanceledFlightSchema);
