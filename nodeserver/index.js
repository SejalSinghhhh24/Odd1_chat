//node server will handle socket io connection
const io= require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });   //port 8000 listen incoming events

const users={};

io.on('connection', socket=>{             //io.on is a socket.io req which listen the events
    socket.on('new-user-joined',name=>{     //socket.on will handle everything to be done with one connection
      // console.log("New user",name)  ;  
      //any user joins, notify them  
      users[socket.io]= name;
      socket.broadcast.emit('user-joined', name);    //for telling others that other user joined
    });

    socket.on('send',message=>{
      // console.log("New");
      //broadcast the message to everyone in the chat present
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message=>{//diconnent is builtin event
      //is someone leaves then notify others about it
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})