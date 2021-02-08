const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const users = require('./routes/api/users');
const { notFound, errorHandler }  = require('./middleware/errorMiddleware');

//Load config
//dotenv.config({path: './config/config.env'});
dotenv.config();

//Connect Database
connectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

//Enable cors
app.use(cors());

//Body parser middeware
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use routes
app.use('/api/v1/users', users);

//Logging
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} MODE on port ${PORT}`)); 