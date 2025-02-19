import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('MISSING_MONGO_URI');
}

export default async function mongodb() {
  const db = mongoose.connection;
  if (db.readyState >= 1) return db;
  const client = await mongoose.connect(MONGO_URI, {
    autoIndex: true,
  });
  client.connection.on('error', (err) => console.error('MongoDB Error', err));
  return mongoose.connection;
}
