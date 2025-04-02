import connectToDatabase from '../../lib/mongodb';
import CanceledFlight from '../../models/CanceledFlight';

export default async function handler(req, res) {
  // Get the flight ID from the query
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Flight ID is required' 
    });
  }

  try {
    // Connect to the database
    await connectToDatabase();
    
    // Find the specific flight by ID
    const flight = await CanceledFlight.findById(id);
    
    // Check if flight exists
    if (!flight) {
      return res.status(404).json({ 
        success: false, 
        message: 'Flight not found' 
      });
    }
    
    // Return the flight data
    return res.status(200).json({ 
      success: true, 
      data: flight
    });
    
  } catch (error) {
    console.error(`Error fetching flight ${id}:`, error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching flight details',
      error: error.message
    });
  }
}
