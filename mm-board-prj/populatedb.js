#! /usr/bin/env node


  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Message = require("./models/messages");

  const messages = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.

  // const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date()
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date()
//   }
// ];
  
  async function messageCreate(index, text, user, added) {
    const msgdetail = {
      text: text,
      user: user,
      added: added,
    };
  
    const msg = new Message(msgdetail);
    await msg.save();
    messages[index] = msg;
    console.log(`Added msg: ${text}`);
  }
  
  async function createMessages() {
    console.log("Adding Messages");
    await Promise.all([
      messageCreate(0,
        "Beautiful weather we are having",
        "Anon12",
        new Date(),
      ),
      messageCreate(1,
        "It is indeed beautiful weather we are having",
        "Bobbert",
        new Date (),
      ),
      messageCreate(2,
        "You can say that again brother",
        "Lorax",
        new Date(),
      ),
    ]);
  }
  
