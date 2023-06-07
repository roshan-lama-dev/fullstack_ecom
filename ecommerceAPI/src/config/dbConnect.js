import mongoose from "mongoose";
export const dbconnect = () => {
  try {
    const conn = mongoose.connect(process.env.MongoUrl);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
