const express = require("express");
const mongoose =require("mongoose");
const routes = require("./routes");
//const { Mongoose } = require("mongoose");
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/googlebooksDB",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }

);


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
