const express = require('express');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

const userRoutes = require('./routes/users.routes');
app.use(userRoutes);

app.listen(3002, () => {
    console.log("Server running at http://localhost:3002");
})