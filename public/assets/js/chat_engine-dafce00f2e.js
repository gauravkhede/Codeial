class chatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("Connection Established using Sockets"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined!",e)}))})),$("#send-button").click((function(){let s=$("#chatbox-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeial"})})),e.socket.on("load_old_messages",(function(s){for(var o=0;o<s.length;o++){let a=$("<li>"),t="other-message";s.user_email==e.userEmail&&(t="self-message"),a.append($("<span>",{html:s[o].message})),a.append($("<sub>",{html:s[o].user_email})),a.addClass(t),$("#chat_messages_list").append(a)}})),e.socket.on("recieve_message",(function(s){console.log("message recieved",s.message);let o=$("<li>"),a="other-message";s.user_email==e.userEmail&&(a="self-message"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.user_email})),o.addClass(a),$("#chat_messages_list").append(o)}))}}