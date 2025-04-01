import Flight from '../../../models/Flight';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    const { id } = req.query;
    const flight = await Flight.findOne({ flightNumber: id });
    
    if (!flight) {
      return res.status(404).json({ 
        success: false, 
        message: 'Flight not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: flight 
    });
  } catch (error) {
    console.error('Error fetching flight:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching flight',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
