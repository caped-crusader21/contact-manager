const express = require("express");
const errorHandler = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT;

//whenever we need to use any middleware make use of app.use()
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.use("/api/users",require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
}); 