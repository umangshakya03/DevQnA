import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB successfully`);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
  }
};

export default connectDB;
