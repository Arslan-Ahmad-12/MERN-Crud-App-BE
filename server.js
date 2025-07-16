const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,              
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));




app.use("/api/users", userRoutes);


// Routes
app.use("/api/projects", projectRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
