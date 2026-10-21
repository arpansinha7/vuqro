# Vuqro 🔗

Vuqro is a URL shortener that transforms long URLs into short, shareable links. Vuqro makes shortening and sharing links effortless.

## ✨ Features

- **URL Shortening** — Transform long URLs into compact, shareable links.
- **Instant Redirection** — Redirect users to the original destination through a short link.
- **One-Click Copy** — Copy generated links directly to your clipboard.
- **URL Validation** — Validate URLs before submitting them.
- **Redis Caching** — Cache URL mappings for faster redirects, with graceful fallback to MongoDB when Redis is unavailable.
- **Responsive Interface** — A clean, responsive UI with a dark theme and emerald-green accents.
- **Error Handling** — Clear feedback for invalid URLs and unsuccessful requests.

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB
- Redis

### 1. Clone the Repository

```bash
git clone https://github.com/arpansinha7/vuqro.git
cd vuqro
```

### 2. Set Up the Backend

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create your environment file from the provided template:

```bash
cp .env.example .env
```

Fill in the required environment variables in server/.env using your own configuration.

Replace the MongoDB URI with your own connection string if you're using MongoDB Atlas. Make sure the environment variable names match those used in your backend.

Start the backend using the available script in `server/package.json`:

```bash
npm run dev
```

Or, if you have a start script configured:

```bash
npm start
```

### 3. Set Up the Frontend

Open a new terminal and navigate to the client directory from the project root:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to use Vuqro.

**Note:** The Vite development proxy forwards API requests to the backend running on port `8080`. Make sure the backend is running before shortening URLs.

---

💚