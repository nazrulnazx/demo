const express = require('express');
const connectDB      = require('./config/db');

// Connect to database
connectDB();

const app     = express();
const PORT    = process.env.PORT || 3000;


app.get('/',(req,res) => {
    res.send('API Running');
});


app.listen(PORT,() => {
    console.log(`App is listing on port ${PORT}`);
});
