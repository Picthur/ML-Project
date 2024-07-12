require('dotenv').config();
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const express = require('express');
const cors = require('cors');


const app = express();

// Enable CORS for all routes
app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use('/api', cors(), routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
