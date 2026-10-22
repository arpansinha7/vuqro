import { createClient } from 'redis';
import 'dotenv/config';


const redisClient = createClient({
    url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

async function ConnectRedis()
{
    if(redisClient.isOpen)
    {
        return;
    }
    try
    {
        await redisClient.connect();
        console.log(`Redis connected successfully`);
    }
    catch(error)
    {
        console.log(`Error: ${error.message}`);
    }
}

export { ConnectRedis, redisClient };