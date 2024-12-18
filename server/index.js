import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/Users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./config/connectDB.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) => {
  res.send("DevQnA");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
  console.log(`Server running on port ${PORT}`);
});
