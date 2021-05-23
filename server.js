const express = require('express');
const http = require('http');
const Path =require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/format')


const app = express();
const server = http.createServer(app);

//Creating Socket layer by passing the server instance
const io = socketio(server);
const PORT = 3000 || process.env.PORT
const bot = "Admin"

//Listening for socket Event
io.on ('connection',socket=>{

    socket.on('joinRoom',()=>{

        socket.emit('message',formatMessage(bot,'Wellcome to Totalk'));
            //Brosdcast the message to eveyone except the joinee
        socket.broadcast.emit('message',formatMessage(bot,'A user has joined the Chat'));

    })

    //Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage('USER',msg));
    })

     //When a user disconnect
     socket.on('disconnect',()=>{
        io.emit('message',formatMessage(bot,'A user has left the room'));
    });
    
})

app.use(express.static(Path.join(__dirname,'public')))

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});