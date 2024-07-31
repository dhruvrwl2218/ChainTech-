
import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import userRoutes from "./routes/user.js"
import 'dotenv/config'// For environment variables

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Specifically allow your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
  credentials: true // Allow credentials if required
}));

app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// Routes
// const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
