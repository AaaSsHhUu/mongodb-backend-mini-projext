// To initialize th empty database

const mongoose = require("mongoose");
const Chat = require("./Models/chat.js");

main()
.then((res) => {
    console.log("Connected to DB Successfully");
})
.catch(err => console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from : "Rohan",
        to : "Saksham",
        msg : "Send me notes for exam",
        created_at : new Date()
    },
    {
        from : "Sakshi",
        to : "Saqib",
        msg : "Teach me about JS callbacks",
        created_at : new Date()
    },
    {
        from : "Mohit",
        to : "Himanshu",
        msg : "Lets meet at the park",
        created_at : new Date()
    },
    {
        from : "Harry",
        to : "Shyam",
        msg : "Don't forget to bring the file",
        created_at : new Date()
    },
    {
        from : "Hemant",
        to : "Kamal",
        msg : "I will be there at 5 p.m sharp",
        created_at : new Date()
    },
]

Chat.insertMany(allChats);