import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cgpaRoutes from './routes/cgpaRoutes.js';  // ✅ Correct path & ESM default import
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cgpa', cgpaRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

// const Student = mongoose.model('Student', new mongoose.Schema({
//   name: String,
//   cgpa: Number
// }));

// app.post('/students', async (req, res) => {
//   const { name, cgpa } = req.body;
//   try {
//     const student = new Student({ name, cgpa });
//     await student.save();
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving student data' });
//   }
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
