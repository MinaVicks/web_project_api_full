const express = require('express');
require ("dotenv").config();
const cors = require ("cors");

const connectDB = require('./db.js');
const authRoutes= require('./routes/auth.js');
const auth = require('./middleware/auth.js');
const cardRoutes = require('./routes/cardRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 3001;



app.get("/", (req,res) =>{
    console.log("Middleware funciono")
});

app.get("/api/protegida" , auth, (req, res) => {
    res.send(`User with id  ${req.user.userId} is authenticated`);
});

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});