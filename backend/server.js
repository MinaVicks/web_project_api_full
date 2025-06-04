const connectDB = require('./db');
const express = require('express');
const auth = require('./middleware/auth');

const app = express();
const PORT=  3001;

connectDB();

app.use(auth);

app.get("/" , (req, res) => {
    res.send("Middleware funcionality is working");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);