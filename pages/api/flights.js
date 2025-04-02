import connectToDatabase from '../../lib/mongodb';
import CanceledFlight from '../../models/CanceledFlight';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get all canceled flights, sorted by most recent first
    const flights = await CanceledFlight.find({})
      .sort({ createdAt: -1 })
      .limit(100);
    
    // Return the flights
    return res.status(200).json({ 
      success: true, 
      count: flights.length,
      data: flights
    });
    
  } catch (error) {
    console.error('Error fetching flights:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching canceled flights',
      error: error.message
    });
  }
}
