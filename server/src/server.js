import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

try
{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}
catch(error)
{
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
}

app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});