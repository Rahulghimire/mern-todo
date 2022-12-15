const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

//use express.json to get data into json format
app.use(express.json());

//app use cors
app.use(cors());

//connect to the database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(console.log("Database Connected"))
  .catch((err) => console.log(err));

//add port and connect to the server
const PORT = process.env.PORT || 5500;

//lets import routes
const TodoItemRoute = require("./routes/todoItems");
app.use("/", TodoItemRoute);

app.listen(PORT, () => console.log("Server Connectedd"));
