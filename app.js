require('dotenv').config();

const express = require('express')
const app = express();
const pool = require('./config/postgredb');
const cuadranteRoutes = require('./routes/cuadranteRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API for the Beach Management System');
});


app.use('/usuarios', userRoutes);
app.use('/cuadrante', cuadranteRoutes)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


