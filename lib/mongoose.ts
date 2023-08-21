import mongoose from "mongoose";

let isConnedted = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("No MONGODB_URL found in .env file");

  if (isConnedted) return console.log("Already connected to DB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnedted = true;

    console.log("Connected to DB");
  } catch (e) {
    console.log("Error connecting to DB", e);
  }
};
