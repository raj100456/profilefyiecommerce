const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB();

app.use(
  cors({
    origin:
      "https://profilefyiecomm-3amoglwo1-rajs-projects-a9b7d87e.vercel.app/",
    credentials: true,
  })
);
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
