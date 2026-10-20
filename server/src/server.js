import express from 'express';
import 'dotenv/config';
import cors from cors;

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});