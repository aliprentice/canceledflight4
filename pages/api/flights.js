// pages/api/flights.js
// Simplified version without database dependencies

export default function handler(req, res) {
  // Mock data for cancelled flights
  const flights = [
    {
      flightNumber: 'BA123',
      airline: 'British Airways',
      origin: 'LHR',
      destination: 'JFK',
      scheduledDeparture: '2025-04-01T12:00:00Z',
      status: 'CANCELLED',
      reason: 'Weather conditions',
      updatedAt: new Date().toISOString()
    },
    {
      flightNumber: 'LH456',
      airline: 'Lufthansa',
      origin: 'FRA',
      destination: 'CDG',
      scheduledDeparture: '2025-04-01T14:30:00Z',
      status: 'CANCELLED',
      reason: 'Technical issues',
      updatedAt: new Date().toISOString()
    },
    {
      flightNumber: 'AF789',
      airline: 'Air France',
      origin: 'CDG',
      destination: 'MAD',
      scheduledDeparture: '2025-04-01T16:45:00Z',
      status: 'CANCELLED',
      reason: 'Operational constraints',
      updatedAt: new Date().toISOString()
    }
  ];
  
  return res.status(200).json({ 
    success: true, 
    data: flights 
  });
}

