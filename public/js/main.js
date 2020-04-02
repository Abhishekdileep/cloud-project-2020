
const chatFrom = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const socket = io();  

//getting the User name and room from the URL 
const { username , room } = Qs.parse(location.search , {
    ignoreQueryPrefix : true
})

//Join chatroom 
socket.emit('joinRoom' , { username , room });


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