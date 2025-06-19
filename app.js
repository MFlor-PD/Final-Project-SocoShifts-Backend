const express = require('express')
const app = express();
const userRoutes = require('./routes/userRoutes');
const beachRoutes = require('./routes/beachRoutes');
const monthRoutes = require('./routes/monthRoutes');
const weekRoutes = require('./routes/weekRoutes');
const rolRoutes = require('./routes/rolRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const PORT = process.env.PORT;
const pool = require('./config/postgredb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API for the Beach Management System');
});

app.use('/usuarios', userRoutes);
app.use('/playas', beachRoutes);
app.use('/meses', monthRoutes);
app.use('/dias_semana', weekRoutes);
app.use('/roles', rolRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


