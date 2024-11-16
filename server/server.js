import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';  // Import the database connection
import Contact from './models/Contact.js';
import contactRoutes from './routes/contacts.js';  

const app = express();

// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use contact routes
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
