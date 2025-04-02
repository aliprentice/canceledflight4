import connectToDatabase from '../../lib/mongodb';
import CanceledFlight from '../../models/CanceledFlight';

export default async function handler(req, res) {
  // Only allow POST requests for webhook
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectToDatabase();
    
    // Extract flight data from the webhook payload
    const webhookData = req.body;
    
    // Create a new canceled flight record
    const canceledFlight = new CanceledFlight({
      flightNumber: webhookData.flightNumber || webhookData.flight_number,
      airline: webhookData.airline,
      departureAirport: webhookData.departureAirport || webhookData.departure,
      arrivalAirport: webhookData.arrivalAirport || webhookData.arrival,
      scheduledDeparture: webhookData.scheduledDeparture || webhookData.departure_time,
      cancellationReason: webhookData.reason || webhookData.cancellationReason,
      cancellationTime: webhookData.cancellationTime || new Date(),
      webhookData: webhookData // Store the complete webhook payload
    });
    
    // Save to database
    await canceledFlight.save();
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Canceled flight data received and stored',
      flightId: canceledFlight._id
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing webhook data',
      error: error.message
    });
  }
}
