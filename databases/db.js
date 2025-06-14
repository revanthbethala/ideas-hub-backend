import mongoose, { mongo } from "mongoose";

export default async function connectDB() {
  try {
    mongoose.connect("mongodb://localhost:27017/ideasHub");
    console.log("Connected to Mongo")
  } catch (e) {
    console.log(e);
  }
}
