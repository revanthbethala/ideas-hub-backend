import mongoose, { mongo } from "mongoose";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}
