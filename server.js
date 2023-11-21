const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const cors = require('cors')

const app = express();
app.use(express.json())

app.use(cors())
connectDB();

app.get('/', (req, res) => {
  res.send('API running...')
})

app.use('/api/v1/product', require('./router/product'))
app.use('/api/v1/sale', require('./router/sale'))

app.listen(process.env.PORT || 5000, () => console.log('Server start running'))
