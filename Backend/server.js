import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import authenticateToken from "./middleware/authMiddleware.js";
import producerRoutes from "./routes/producerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/producers", producerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/vinotekaDb")
  .then(() => console.log("MongoDB uspješno povezan"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server pokrenut na portu: ${PORT}`));
