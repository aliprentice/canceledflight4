import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aprentice:<db_dEJcrQUmEodrwgeq>@cluster0.uarhn3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Remove password from logs
const redactedUri = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/[^:]+:([^@]+)@/,
  'mongodb$1://[username]:[redacted]@'
);
console.log(`Using MongoDB connection: ${redactedUri}`);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('Connected to MongoDB Atlas');
        return mongoose;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
