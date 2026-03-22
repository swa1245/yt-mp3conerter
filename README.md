# YouTube to MP3 Converter (Audio Forge)

A full-stack web application designed for high-performance YouTube-to-MP3 conversion using a background job queue with Redis and Bull.

## Features
- ✨ **Clean, Modern UI**: Built with React 18, Tailwind CSS, and Lucide icons.
- 🚀 **Background Processing**: Jobs are queued using Redis/Bull so the server never hangs.
- ⏱️ **Real-time Status**: Polling mechanism keeps you updated on your conversion progress.
- 📥 **Auto-download**: MP3 is automatically downloaded once conversion completes.
- 🛠️ **File Cleanup**: Converted files are automatically removed from the server after download.

---

## Prerequisites
- **MongoDB (v7+) running locally on 27017**
- **Redis (v7+) running locally on 6379**
- **Node.js (v18+)**
- **npm** or **yarn**

---

## Getting Started

### 1. Ensure Services are Running
Make sure your local MongoDB and Redis instances are started and accessible.

### 2. Setup Environment Variables
Navigate to the `server` directory and create a `.env` file:
```bash
cd server
cp .env.example .env
```
Then edit `.env` and add your credentials:
- `MONGO_URI`: Your MongoDB connection string
- `REDIS_HOST`: Your Redis host
- `REDIS_PORT`: Your Redis port
- `REDIS_PASSWORD`: Your Redis password (if required)

### 3. Setup Backend Server
Install dependencies and start the server:
```bash
npm install
npm run dev
```
Wait until you see "Connected to MongoDB" and "Server listening on port 5000".

### 4. Setup Frontend Client
Open another terminal and navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```
Click the link provide (usually [http://localhost:5173](http://localhost:5173)) to open the app.

---

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Axios, Lucide
- **Backend**: Node.js, Express, TypeScript, Mongoose, Bull
- **Tools**: ytdl-core, fluent-ffmpeg, ffmpeg-static
- **Infrastructure**: MongoDB, Redis (via Docker)

---

## Project Structure
- `server/`: Express API with Mongoose and Bull workers
- `client/`: Vite-powered React 18 frontend
- `docker-compose.yml`: Redis and MongoDB configuration

---

Enjoy converting! Forge your high-quality MP3s instantly.
