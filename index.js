const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./Models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride('_method'))
app.set("views",path.join(__dirname,"/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"/public")))

main()
.then((res) => {
    console.log("Connected to DB Successfully");
})
.catch(err => console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Root
app.get("/",(req,res)=>{
    res.send("Root is working");
})

// Chats route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find(); // find returns a promise 
    res.render("index.ejs",{chats});
})

// New chat route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})

// Posting new chat
app.post("/chats",(req,res)=>{
    let {from : newFrom,msg : newMsg,to : newTo} = req.body;
    let newChat = new Chat({
        from : newFrom,
        msg : newMsg,
        to : newTo,
        created_at : new Date()
    }) 
    newChat.save().then((res) => {
        console.log("Chat saved");
    })
    .catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
})

// Edit page route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
// Edit route
app.patch("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    await Chat.findByIdAndUpdate(id,{msg : newMsg},{runValidators : true, new : true}) 
    res.redirect("/chats");
})

// Delete Route

app.get("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

// how to create a pop-up window asking for assurance to delete the message

app.listen(8080,()=>{
    console.log(`Listening to port 8080`);
})
