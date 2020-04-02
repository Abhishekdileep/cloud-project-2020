const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const { userJoin , getCurrentUser , removeUser ,getRoomUsers} = require('./utils/user');

//Intializations 
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = 'Moderator';

//Set Static Folder to Public
app.use(express.static(path.join(__dirname , 'public')))

//Run on Client Connections
io.on('connection' , socket => {
  //Broadcast when a user connects
  socket.on('joinRoom', ({username , room})=>{
    
    const user = userJoin(socket.id , username , room );
    socket.join(user.room);
    //Welcome current user
    socket.emit('message' , formatMessage(botName , 'Welcome to Chat Chord'));
    
    // broadcast when a user connects
    socket.broadcast
    .to(user.room)
    .emit('message' , formatMessage(botName ,`
    ${user.username} has Joined the chat`));
    
    //Broadcast all the users in the room info
    io.to(user.room)
    .emit('roomUsers', {
      room : user.room,
      users : getRoomUsers(user.room)
    } )
})

//Listen for chatMessaage
socket.on('chatMessage' , msg => {

  const user = getCurrentUser(socket.id);
  io.to(user.room).emit('message' , formatMessage(user.username ,msg))
});
 
  //Disconnect the Room 
  socket.on('disconnect' , ()=>{
    const user =  removeUser(socket.id)
    if(user) {
      io.to(user.room).emit('message',formatMessage(botName ,`${user.username} has left the chat`))
    }
    io.to(user.room)
    .emit('roomUsers', {
      room : user.room,
      users : getRoomUsers(user.room)
    } )
  })

})

//Port Value 
const PORT = 3001 || process.env.PORT;


server.listen(PORT , () => console.log(`Server Runnnig on ${PORT}`));