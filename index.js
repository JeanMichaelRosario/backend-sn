const express = require("express");
const db = require('./config/db');

const app = express();
db();


const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => res.send("yey"));



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));