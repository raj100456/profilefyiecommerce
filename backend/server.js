const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://raj100456-profilefyi-ecommerce.vercel.app/",
      `https://raj100456-profilefyi-ecommerce-rajs-projects-a9b7d87e.vercel.app/`,
      `https://raj100456-profilefyi-ecommerce-raj100456-rajs-projects-a9b7d87e.vercel.app/`,
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
