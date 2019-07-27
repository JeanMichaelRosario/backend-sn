const express = require("express");
const db = require('./config/db');

const app = express();
db();


const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }))

app.get('/', (_, res) => res.send("yey"));

app.use('/api/users', require('./routes/api/controllers/users'));
app.use('/api/auth', require('./routes/api/controllers/auth'));
app.use('/api/profile', require('./routes/api/controllers/profile'));
app.use('/api/posts', require('./routes/api/controllers/posts'));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));