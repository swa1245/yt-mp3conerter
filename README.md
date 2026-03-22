# YouTube to MP3 Converter

A full-stack web application that converts YouTube videos to MP3 audio files with automatic download functionality.

## Features

- Convert YouTube videos and shorts to MP3 format
- Automatic download when conversion completes
- Real-time job status tracking
- Background processing with Redis queue
- Clean and modern user interface
- 128kbps audio quality output

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Axios for API calls
- Lucide React for icons
- SCSS for styling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for job storage
- Redis with Bull for job queue management
- yt-dlp for YouTube downloads
- FFmpeg for audio conversion

## Prerequisites

- Node.js v18 or higher
- MongoDB instance
- Redis instance
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/swa1245/yt-mp3conerter.git
cd yt-mp3conerter
```

### 2. Setup Backend

Navigate to server directory and install dependencies:
```bash
cd server
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
```

### 3. Setup Frontend

Navigate to client directory and install dependencies:
```bash
cd client
npm install
```

## Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```

The server will start on http://localhost:5000

### Start Frontend Client
```bash
cd client
npm run dev
```

The client will start on http://localhost:5173

## Usage

1. Open the application in your browser
2. Paste a YouTube video or shorts URL
3. Click the convert button
4. Wait for the conversion to complete
5. The MP3 file will download automatically

## Project Structure

```
yr-link/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── package.json
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── queues/        # Bull queue configuration
│   │   ├── routes/        # Express routes
│   │   ├── workers/       # Background job workers
│   │   └── index.ts       # Server entry point
│   └── package.json
│
└── README.md
```

## API Endpoints

### POST /api/convert
Start a new conversion job
- Body: `{ url: string }`
- Returns: `{ jobId: string }`

### GET /api/job/:jobId
Get job status
- Returns: Job object with status and details

### GET /api/download/:jobId
Download the converted MP3 file
- Returns: MP3 file stream

## Environment Variables

### Server
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `REDIS_HOST` - Redis server host
- `REDIS_PORT` - Redis server port
- `REDIS_PASSWORD` - Redis password (if required)

## License

MIT

## Author

Created by swa1245
