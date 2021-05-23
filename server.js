const express = require('express');
const mongoose  = require('mongoose');
const app = require('./app');

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


port = 8000 || process.env.PORT;
app.listen(port,()=>{
  console.log(`server is running on ${port}`)
});
