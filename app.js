const express = require('express')
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT;
const pool = require('./config/postgredb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});