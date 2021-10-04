const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const port = 5500;


module.exports = {app, port};