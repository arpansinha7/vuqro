import { rateLimit } from 'express-rate-limit';

const message = {
    error: 'Too many requests. Please try again later.'
};

const statusCode = 429;

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
    handler: (req, res) => {
        res.status(429).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Too Many Requests | Vuqro</title>
            <style>
              body {
                margin: 0;
                min-height: 100vh;
                display: grid;
                place-items: center;
                background: #050807;
                color: #ecfdf5;
                font-family: system-ui, sans-serif;
                text-align: center;
                padding: 20px;
              }
              main { max-width: 420px; }
              h1 { color: #34d399; }
              p { color: #82958a; line-height: 1.6; }
              button {
                margin-top: 16px;
                padding: 12px 20px;
                border: 0;
                border-radius: 8px;
                background: #34d399;
                color: #04110b;
                font-weight: 600;
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <main>
              <h1>Whoa, slow down! 🛑</h1>
              <p>
                Too many requests. Please wait a moment before trying again.
              </p>
              <button onclick="window.location.reload()">Try again</button>
            </main>
          </body>
        </html>
        `);
    }
});

export { urlCreationRateLimiter, redirectRateLimiter };