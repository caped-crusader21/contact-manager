const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT;

//whenever we need to use any middleware make use of app.use()
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
}); 