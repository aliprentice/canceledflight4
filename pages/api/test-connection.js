// This file is for testing the MongoDB connection
import connectToDatabase from '../lib/mongodb';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const mongoose = await connectToDatabase();
    console.log('MongoDB connection successful!');
    console.log('Connection state:', mongoose.connection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    console.log('Connection test completed successfully.');
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
  }
}

// Export a function that can be called from an API route
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    res.status(200).json({ 
      success: true, 
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message
    });
  }
}
