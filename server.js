const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require('path');

// Load env
dotenv.config({ path: './config.env' });

const app = express();

// Dev logging
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

// Routes
app.use('/api/results', require('./routes/results'));
app.use('/api/stream', require('./routes/stream'));

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, 'build'))); 

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});