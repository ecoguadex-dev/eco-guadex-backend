# EcoGuadex Backend API

This is the backend server for the EcoGuadex platform. It provides APIs for data management, user interactions, and integration with cloud services.


## 🚀 Features

- RESTful API architecture
- MongoDB database integration
- Environment variable configuration
- Scalable deployment (Render, AWS, etc.)
- Error handling and logging


## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv


## 📁 Project Structure

├── server.js
├── package.json
├── .env
├── /routes
├── /models
├── /controllers
└── /config


## ⚙️ Installation

### 1. Clone the repository
bash
git clone https://github.com/nathanielacquaaharhin/ecoguadex-backend.git
cd ecoguadex-backend
2. Install dependencies
npm install
3. Create environment variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
▶️ Running the Server
Development mode
npm run dev
Production mode
npm start
🌐 Environment Variables
Variable	Description
PORT	Server port (default: 5000)
MONGO_URI	MongoDB connection string
🔌 API Endpoints

API documentation will be added soon.

👤 Author

Nathaniel Arhin
Founder, EcoGuadex

📄 License

This project is proprietary software owned by EcoGuadex.
Unauthorized copying, distribution, or modification is strictly prohibited.
