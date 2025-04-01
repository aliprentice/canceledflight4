// pages/webhook.js
// Simplified version without database dependencies

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. This endpoint accepts POST requests only.' 
    });
  }
  
  try {
    // Log the incoming webhook data
    console.log('Webhook received:', req.body);
    
    const data = req.body;
    
    // Check if this is a flight cancellation
    if (data.status !== 'CANCELLED') {
      return res.status(200).json({ 
        success: true, 
        message: 'Notification received but not a cancellation' 
      });
    }
    
    // Log the cancellation
    console.log(`Flight ${data.flightNumber} cancellation received`);
    
    // Simple successful response
    return res.status(200).json({ 
      success: true, 
      message: 'Flight cancellation processed successfully',
      flightNumber: data.flightNumber
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
