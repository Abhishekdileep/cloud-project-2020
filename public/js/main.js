
const chatFrom = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const socket = io();  
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//getting the User name and room from the URL 
const { username , room } = Qs.parse(location.search , {
    ignoreQueryPrefix : true
})

//Join chatroom 
socket.emit('joinRoom' , { username , room });
//Get Room and Users
socket.on('roomUsers' , ({room , users })=> {
    outputRoomName(room);
    outputUser(users)
})

// Message From server
socket.on('message' , message => {
    console.log(message);
    outputMessage(message);
})

//Message Submit
chatFrom.addEventListener('submit' , e =>{
    //Default all the submitted to file
    e.preventDefault(); 
    //Get Message from the Target Value 
    const msg = e.target.elements.msg.value;
    //Emit Message to JS
    socket.emit('chatMessage',msg);
    //Scroll Down 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//Output function to Dom
function outputMessage(message) {
    const div =   document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
    chatMessage.scrollTop = chatMessage.scrollHeight;
}

//Add Room Name to your dom
function outputRoomName(room) {
    const div = dom.createElement()
}