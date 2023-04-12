// modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// instantiate express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/images", express.static("uploads"));

// routes
const listings = require("./routes/Listings");
const members = require("./routes/Members");

app.use("/members", members);
app.use("/listings", listings);

// connection
main().catch((error) => {
	console.log(error);
});

async function main() {
	await mongoose.connect(process.env.DB_STRING);
}

// listen server
const port = process.env.PORT;
app.listen(port || 5000, () => console.log(`server listening on port: ${port}`));
