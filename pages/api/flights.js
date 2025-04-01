import Flight from '../../models/Flight';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    // Get all cancelled flights, sorted by most recent
    const flights = await Flight.find({ status: 'CANCELLED' })
      .sort({ updatedAt: -1 })
      .limit(20);
    
    return res.status(200).json({ 
      success: true, 
      data: flights 
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching flights',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
