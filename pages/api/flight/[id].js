// pages/api/flight/[id].js
// Simplified version without database dependencies

export default function handler(req, res) {
  const { id } = req.query;
  
  // Mock data for a specific flight
  const flight = {
    flightNumber: id,
    airline: id.startsWith('BA') ? 'British Airways' : 
             id.startsWith('LH') ? 'Lufthansa' : 
             id.startsWith('AF') ? 'Air France' : 'Unknown Airline',
    origin: 'LHR',
    destination: 'JFK',
    scheduledDeparture: '2025-04-01T12:00:00Z',
    status: 'CANCELLED',
    reason: 'Weather conditions',
    updatedAt: new Date().toISOString(),
    alternativeFlights: [
      {
        flightNumber: 'BA456',
        scheduledDeparture: '2025-04-01T15:30:00Z'
      },
      {
        flightNumber: 'VS201',
        scheduledDeparture: '2025-04-01T18:45:00Z'
      }
    ],
    hotelOptions: [
      {
        name: 'Airport Hotel',
        distance: '0.5 miles',
        price: '£120'
      },
      {
        name: 'City Center Hotel',
        distance: '5 miles',
        price: '£95'
      }
    ]
  };
  
  return res.status(200).json({ 
    success: true, 
    data: flight 
  });
}
