import express from "express";
import cors from "cors";
import authUser from "./routes/auth.js";
import noteRoutes from "./routes/noteRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authUser);
app.use("/api/notes", noteRoutes );

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
