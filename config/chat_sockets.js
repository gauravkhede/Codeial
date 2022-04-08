const Chatting=require('../models/chatengine');
module.exports.chatSockets= function(socketServer){
    let io= require('socket.io')(socketServer,{ cors:{ origin:'*'}});


    io.sockets.on('connection',function(socket){
        Chatting.find({},function(err,docs){
            if(err){ console.log('error in finding chat message',err); return; }
            socket.emit('load_old_messages',docs);
        });
        console.log('New connection recieved',socket.id);

        socket.on('disconnect',function(){
            console.log('Socket disconnected');
        });
        socket.on('join_room',function(data){
            console.log('joining request recorded',data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
        //detect send message and broadcast it to everyone in the room
        socket.on('send_message',function(data){
            var newMsg= new Chatting({message:data.message,user_email:data.user_email,chatroom:data.chatroom});
            newMsg.save(function(err){
                if(err){ console.log('*** Falana Error in chat_sockets line 22 ',err); return; }
                io.in(data.chatroom).emit('recieve_message',data);
            });
            

        });


    });


}