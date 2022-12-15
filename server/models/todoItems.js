//Import mongoose to create a schema
const mongoose = require("mongoose");

//create schema
const TodoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});
//export the Schema
module.exports = mongoose.model("todo", TodoItemSchema);
