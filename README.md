# EcoGuadex Backend API

This is the backend server for the EcoGuadex platform. It provides RESTful APIs for data management, user interactions, and integration with MongoDB and cloud services.


## 🚀 Features

- RESTful API architecture  
- MongoDB database integration (Mongoose)  
- Environment-based configuration  
- Scalable deployment (Render, AWS, etc.)  
- Error handling and logging  


## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- dotenv  

---

## 📁 Project Structure


├── server.js
├── package.json
├── .env (local only)
├── /routes
├── /controllers
├── /models
└── /config



## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/ecoguadex-dev/eco-guadex-backend.git
cd eco-guadex-backend
2. Install dependencies
npm install
🔐 Environment Variables (Local Development Only)

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string

⚠️ .env is used only for local development and is NOT used in production.

▶️ Running the Server
Development mode
npm run dev
Production mode
npm start
🌐 Deployment (Render)

When deploying to Render:

Set environment variables in the dashboard:
MONGO_URI → MongoDB connection string
Do NOT set PORT
Render assigns it automatically
🔌 API Endpoints

API documentation will be added soon.

👤 Author

Nathaniel Arhin
Founder, EcoGuadex

📄 License

This project is proprietary software owned by EcoGuadex. Unauthorized copying, distribution, or modification is strictly prohibited.

