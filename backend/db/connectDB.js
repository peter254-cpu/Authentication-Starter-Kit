import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    //await conn.mongoose.connection.db.dropDatabase();
  } catch (error) {
    console.log("Error connection to mongoDB: ", error.message);
    process.exit(1);
  }
};
