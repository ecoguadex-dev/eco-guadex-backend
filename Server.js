require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
})
.catch((err) => {
    console.error("MongoDB Error:", err);
});
