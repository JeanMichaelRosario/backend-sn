const express = require("express");
const db = require('./config/db');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

db();

app.use(express.json({ extended: false }))

app.get('/', (_, res) => res.send("yey"));

app.use('/api/users', require('./routes/api/controllers/users'));
app.use('/api/auth', require('./routes/api/controllers/auth'));
app.use('/api/profile', require('./routes/api/controllers/profile'));
app.use('/api/posts', require('./routes/api/controllers/posts'));


app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));