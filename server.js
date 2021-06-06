const express = require('express');
const http = require('http');
const Path =require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/format');
const {userJoin, getCurrentUser,userLeave,getRoomUsers} = require('./utils/users')


const app = express();
const server = http.createServer(app);

//Creating Socket layer by passing the server instance
const io = socketio(server);
const PORT = 3000 || process.env.PORT
const bot = "Admin"

//Listening for socket Event
io.on ('connection',socket=>{

    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);

        socket.emit('message',formatMessage(bot,'Wellcome to Totalk'));
            //Brosdcast the message to eveyone except the joinee
        socket.broadcast.to(user.room).emit('message',formatMessage(bot,`${user.username} has joined the Chat`));

    })

    //Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

     //When a user disconnect
     socket.on('disconnect',()=>{
         const user = userLeave(socket.io);
         if(user){
            io.to(user.room).emit('message',formatMessage(bot,`${user.username} has left the room`));
         }
        
    });
    
})

app.use(express.static(Path.join(__dirname,'public')))

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});