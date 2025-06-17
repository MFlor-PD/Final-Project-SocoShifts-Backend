const express = require('express')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});