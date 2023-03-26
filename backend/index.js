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

const Member = require("./models/member");

// ============== HTTP requests here ===============

app.get("/members", async (req, res) => {
    try {
        const result = await Member.find({});
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

app.get("/members/:username", async (req, res) => {
    try {
        const result = await Member.find({ username: req.params.username });
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send("no match found");
        }
    } catch (error) {
        res.send(error);
    }
});

// =================================================

// connection
main().catch((error) => {
    console.log(error);
});

async function main() {
    await mongoose.connect(process.env.DB_STRING);
}

// listen server
const port = process.env.PORT;
app.listen(port || 5000, () =>
    console.log(`server listening on port: ${port}`)
);
