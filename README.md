# 📓 Dun Diary Backend

This is the backend service for the Dun Diary application. It provides an API for summarizing and analyzing blood pressure data using AI. 🤖

## ✨ Features

- 🏥 **Blood Pressure Analysis**: Receives aggregated blood pressure data (daily, weekly, monthly) and uses an AI model (Typhoon) to analyze the data, summarize trends, evaluate stability based on SEM (Standard Error of the Mean), and provide suggestions based on AHA/ACC guidelines.
- 🔐 **Firebase Authentication**: Secures the API endpoints using Firebase Auth tokens.
- ⚡ **Express Server**: Built with Express.js and TypeScript.
- 🚀 **PM2 Support**: Configuration included for running via PM2 in production.

## 📋 Prerequisites

- 🟢 Node.js
- 📦 npm (or yarn)
- 🔑 Firebase Admin SDK Service Account Key
- 🌪️ Typhoon API Key

## 🛠️ Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd dun_diary_backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory based on the following template (or copy from `.env.local` if available):

   ```env
   TYPHOON_API_KEY=your_typhoon_api_key_here
   TYPHOON_BASE_URL=https://api.opentyphoon.ai/v1
   PORT=8080
   NODE_ENV=development
   ```

4. **Firebase Service Account:**
   Place your Firebase service account JSON key in `src/config/serviceAccountKey.json`.
   *Note: This file is ignored by git.* 🤫

## 💻 Running the Development Server

Start the server in development mode with nodemon:

```bash
npm run dev
```

The server will start on port `8080` by default (or the port specified in your `.env` file). 🌐

## 📡 API Endpoints

### 💚 Health Check

```http
GET /api/
```
Returns a simple welcome message if the server is running. 🎉

### 🩸 Analyze Blood Pressure

```http
POST /api/pressure/analyze
```

**Requires Authentication:** 🛡️ Bearer token (Firebase ID Token) must be provided in the `Authorization` header.

**Request Body:**

```json
{
  "periodType": "week", // "week", "month", or "year"
  "rangeLabel": "1 Feb - 7 Feb 2026",
  "totalRecords": 14,
  "sd": 5.2, // Standard Error of the Mean (SEM)
  "items": [
    {
      "label": "Mon",
      "avgSys": 120,
      "avgDia": 80,
      "avgPulse": 70,
      "minSys": 115,
      "maxSys": 125,
      "minDia": 75,
      "maxDia": 85,
      "count": 2,
      "level": 1
    }
    // ... more items
  ]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": "ภาพรวมความดันโลหิตรายสัปดาห์อยู่ในเกณฑ์ปกติ...",
    "risk_level": "Elevated",
    "suggest": [
      "ดื่มน้ำเยอะๆ",
      "พักผ่อนให้เพียงพอ"
    ],
    "reference": "American Heart Association (AHA)"
  }
}
```

## 🌍 Production Deployment

This project includes an `ecosystem.config.js` file for easy deployment with PM2.

1. **Build the project:** 🏗️
   ```bash
   npm run build
   ```

2. **Start with PM2:** 🚀
   ```bash
   pm2 start ecosystem.config.js
   ```

## 🛠️ Technologies Used

- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Authentication
- [OpenAI SDK](https://github.com/openai/openai-node) - Client for Typhoon API
- [Zod](https://zod.dev/) - Request validation
- [Winston](https://github.com/winstonjs/winston) - Logging
- [PM2](https://pm2.keymetrics.io/) - Process manager
