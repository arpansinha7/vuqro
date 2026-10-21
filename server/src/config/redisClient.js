import redis, { createClient } from 'redis';



const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
});

redisClient.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

async function ConnectRedis()
{
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