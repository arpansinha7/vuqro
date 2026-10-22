import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import db from './model/db.js';
import crypto from 'crypto';
import base62Encode from './utils/base62Encode.js';
import { ConnectRedis, redisClient } from './config/redisClient.js';
import { urlCreationRateLimiter, redirectRateLimiter } from './middleware/rateLimiter.js';


const app = express();
const PORT = process.env.PORT || 8080;

await connectDB();
await ConnectRedis();

app.use(cors());
app.use(express.json());

app.post('/api/urls', urlCreationRateLimiter, async (req, res) => {

    try
    {
        const { longUrl } = req.body;

        const uniqueId = crypto.randomInt(0, 62**7);
        const shortUrl = base62Encode(uniqueId);

        await db.create({
            id: uniqueId,
            longUrl: longUrl,
            shortUrl: shortUrl
        });

        res.status(201).json({
            shortUrl: `${process.env.BASE_URL}/${shortUrl}`
        });
    }
    catch(error)
    {
        console.log('Error: ', error.message);

        if(error.code === 11000)
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

app.get('/:shortUrl', redirectRateLimiter, async (req, res) => {

    try
    {
        const { shortUrl } = req.params;

        try
        {
            const data = await redisClient.get(`url:${shortUrl}`);

            if(data)
            {
                return res.redirect(data);
            }
        }
        catch(error)
        {
            console.error(`Redis error: ${error.message}`);
        }

        const urlData = await db.findOne({shortUrl: shortUrl});

        if(!urlData)
        {
            res.status(404).json({error: 'URL not found!'});
            return;
        }

        try
        {
            await redisClient.set(`url:${urlData.shortUrl}`, urlData.longUrl, {
                EX: 600
            });
        }
        catch(error)
        {
            console.error(`Redis error: ${error.message}`);
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