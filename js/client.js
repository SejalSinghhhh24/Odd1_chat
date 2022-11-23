 const socket =io('http://localhost:8000');
//get elements in res js var
 const form= document.getElementById('send-container');
 const messageInput = document.getElementById('messageInp')
 const messageContainer = document.querySelector(".container")
 //audio
 var audio= new Audio("ting.mp3");
 // function which will append event infoto container
 const append = (message,position)=>{
     const messageElement = document.createElement('div');
     messageElement.innerText=message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if(position=='left'){
        audio.play();
     }
 }
 //name details and let server know
const name= prompt("enter your name to join");
socket.emit('new-user-joined', name);
//new user joins receive his name from the event/server
socket.on('user-joined', name=>{
        append(`${name} joined the chat`,'right')
})
//if data received from server
socket.on('receive', data=>{
    append(`${name} :${data.message}`,'left')
})
//if user leaves the chat, append the info to container
socket.on('left', data=>{
    append(`${name} left the chat`,'right')
})

//if form is submited , send the server about mssg
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})