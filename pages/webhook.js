const crypto = require('crypto');
import Flight from '../models/Flight';
import dbConnect from '../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. This endpoint accepts POST requests only.' 
    });
  }
  
  try {
    // 1. Verify SITA signature (example implementation)
    const signature = req.headers['x-sita-signature'];
    const payload = JSON.stringify(req.body);
    
    // SITA webhook secret from your SITA Flight Data Global credentials
    const SITA_WEBHOOK_SECRET = process.env.SITA_WEBHOOK_SECRET || 'your_sita_webhook_secret';
    
    const expectedSignature = crypto
      .createHmac('sha256', SITA_WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');
      
    // Uncomment in production to enforce signature verification
    /*
    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }
    */
    
    // 2. Connect to database
    await dbConnect();
    
    const data = req.body;
    console.log('Received webhook data:', data);
    
    // 3. Check if this is a flight cancellation
    if (data.status !== 'CANCELLED') {
      return res.status(200).json({ 
        success: true, 
        message: 'Notification received but not a cancellation' 
      });
    }
    
    // 4. Check if the flight is in Europe (origin or destination)
    const europeanAirports = [
      'LHR', 'CDG', 'FRA', 'AMS', 'MAD', 'FCO', 'BCN', 'LGW', 'MUC', 
      'ORY', 'DUB', 'ZRH', 'CPH', 'OSL', 'ARN', 'VIE', 'BRU', 'ATH'
    ];
    
    const isEuropean = 
      europeanAirports.includes(data.origin) || 
      europeanAirports.includes(data.destination);
    
    if (!isEuropean) {
      return res.status(200).json({ 
        success: true, 
        message: 'Flight is not in Europe, ignoring' 
      });
    }
    
    // 5. Store or update flight in database
    const flight = await Flight.findOneAndUpdate(
      { flightNumber: data.flightNumber },
      {
        airline: data.airline,
        origin: data.origin,
        destination: data.destination,
        scheduledDeparture: new Date(data.scheduledDeparture),
        status: data.status,
        reason: data.reason || 'Unknown',
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    console.log(`Flight ${flight.flightNumber} cancellation recorded in database`);
    
    // 6. In a production environment, you would trigger notifications here
    // await sendNotifications(flight);
    
    return res.status(200).json({ 
      success: true, 
      message: 'European flight cancellation processed successfully',
      flightId: flight._id
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing webhook',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
