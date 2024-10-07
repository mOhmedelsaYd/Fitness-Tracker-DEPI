const bodyParser = require('body-parser')
const express  = require("express");
const dotenv = require("dotenv");
const  dbConnection =  require("./config/database");
const userRoute = require("./routes/authRoute");
dotenv.config({ path: './config.env' })
const morgan = require('morgan');

const app = express();
dotenv.config();

// database connection
dbConnection();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", userRoute);




module.exports = app;
