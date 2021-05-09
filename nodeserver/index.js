const io = require("socker.io")(8000);

const users = {}

io.on ("connection",socket=>{
    socket.io('New-User',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('User Joined',name);
    })
    socket.io('send',message=>{
        socket.broadcast.emit('Receive',{message:message,user:users[]})
    })
})