import { rateLimit } from 'express-rate-limit';


const urlCreationRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 30,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    message,
    statusCode
});

const redirectRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    message,
    statusCode
});

export { urlCreationRateLimiter, redirectRateLimiter };