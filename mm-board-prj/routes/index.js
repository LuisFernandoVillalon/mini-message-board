var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require('dotenv').config();

const urlDB = process.env.SECRET_KEY;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(urlDB);
}

const messagesDB = require('../models/messages.js');

async function getMsgs() {
  try {
    //console.log('Inside getMsgs()')
    const messagesArr = await messagesDB.find({});
    return messagesArr;
  } catch (err) {
    console.error(err);
  }
}

/* GET home page. */
//Endpoint 
router.get('/', async (req, res) => {
  const messageArr = await getMsgs();
  //console.log(messageArr);
  res.render('index', { title: 'Message Board', messages: messageArr });
});

//Endpoint
router.post('/new', async (req, res, next) => {
  const messageArr = await getMsgs();
  const newMessage = new messagesDB({
    text: req.body.text,
    user: req.body.user,
    added: new Date()
  });
  console.log(messageArr)
  try {
    const newMsg = await newMessage.save();
    console.log(newMsg);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/');
});

module.exports = router;
