import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import db from './model/db.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import base62Encode from './utils/base62Encode.js';
import { error } from 'console';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(cors());
app.use(express.json());

app.post('/api/urls', async (req, res) => {

    try
    {
        const { longUrl } = req.body;

        const uniqueId = crypto.randomInt(0, 62**7);
        const shortUrl = base62Encode(uniqueId);

        const document = await db.create({
            id: uniqueId,
            longUrl: longUrl,
            shortUrl: shortUrl
        });

        res.status(201).json({
            shortUrl: `http://localhost:${PORT}/${shortUrl}`
        });
    }
    catch(error)
    {
        console.log('Error: ', error.message);

        if(error.code === '11000')
        {
            res.status(503).json({
                error: `Please try again.`
            });
            return;
        }
        res.status(500).json({
            error: `Internal Server Error.`
        });
    }

});

app.get('/:shortUrl', async (req, res) => {

    try
    {
        const { shortUrl } = req.params;

        const urlData = await db.findOne({shortUrl: shortUrl});

        if(!urlData)
        {
            res.status(404).json({error: 'URL not found!'});
            return;
        }

        res.redirect(urlData.longUrl);
    }
    catch(error)
    {
        console.log('Error: ', error.message);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});