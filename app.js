const express = require('express')
const app = express();
const userRoutes = require('./routes/userRoutes');
const beachRoutes = require('./routes/beachRoutes');
require('dotenv').config();
const PORT = process.env.PORT;
const pool = require('./config/postgredb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/usuarios', userRoutes);
app.use('/playas', beachRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


