import express from 'express';
import CgpaRecord from '../models/CgpaRecord.js';  // ✅ Matches your actual file name!

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("🔥 API HIT! Body received:", req.body);
  try {
    const { name, cgpa } = req.body;

    const newRecord = new CgpaRecord({ name, cgpa });
    await newRecord.save();

    res.json({ message: 'CGPA saved successfully!', record: newRecord });
  } catch (error) {
    console.error('Error saving CGPA:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;  // ✅ ESM export
