const express = require("express");
const db = require('./config/db');

const app = express();
db();


const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => res.send("yey"));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));