const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  added: { type: String, required: true }
});


// Export model
module.exports = mongoose.model("Messages", MsgSchema);

