require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("Connected to database..."))
.catch(() => console.log("Error while connecting..."))

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}...`)
})