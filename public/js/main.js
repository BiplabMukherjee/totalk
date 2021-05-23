const chatForm = document.getElementById('chat-form');
const msgBox = document.querySelector('.container');
const socket = io();

//Get parameters from URL 
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix : true
})

//Join Chat room
socket.emit('joinRoom',{username,room});

console.log(username,room)
//Message from Server
socket.on('message', message =>{
    outputMessage(message);

    //Scroll bar such that lowest chat is seen
    msgBox.scrollTop = msgBox.scrollHeight;
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get message text from form 
    const msg = e.target.elements.msg.value

    //emit message to server
    socket.emit('chatMessage',msg);

    //Afer Emit clear the text box and focus on the textbox itself
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

})

function outputMessage (message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector('.container').appendChild(div);

}