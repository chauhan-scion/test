import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

import {User} from './models/User.js'; // Assuming you have a User model defined in models/User

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://pankajchauhanimu:VtG8Ok3AObMNuRHE@cluster0.mzhaltq.mongodb.net/',{ dBName: "Test" } ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    console.log('Connected to MongoDB')
);


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const user = User.create({ username, password });
    res.json({
        message: "User registered successfully",
        data: user})

 });



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful', username: user.username });
});

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});