import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

/**
 *
 * @returns Mongoose connection
 */
export function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  return mongoose.connect(MONGODB_URI);
}
