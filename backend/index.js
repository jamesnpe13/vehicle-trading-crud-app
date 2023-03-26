// modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");

// instantiate express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// ============== HTTP requests here ===============

// =================================================

// listen server
const port = process.env.PORT;
app.listen(port || 5000, () => console.log(`server listening on port: ${port}`));
