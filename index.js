import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./databases/db.js";
import authRoutes from "./routes/auth.route.js";
import ideaRoutes from "./routes/idea.route.js";
const app = express();

app.use(express.json());

dotenv.config();
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Server listening");
});

app.use("/v1/ideas", ideaRoutes);

app.use("/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});
