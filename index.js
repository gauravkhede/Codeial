require('dotenv').config();
const express=require('express');
const logger=require('morgan');
const env= require('./config/environment'); 
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
const port=8000;
const cors=require('cors');

//include library for layouts
const expressLayout=require('express-ejs-layouts');

const db=require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oauth-strategy');


const MongoStore= require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware= require('./config/middleware');

//setup the chat server to be used withsocket.io
const chatServer= require('http').Server(app);
const chatSockets= require('./config/chat_sockets').chatSockets(chatServer);
const Chatting=require('./models/chatengine');
chatServer.listen(5000);
console.log('chat Server is listening on port 5000');
const path= require('path');
if(process.env.name=='development'){
app.use(sassMiddleware({
    src:path.join(__dirname,process.env.asset_path,'scss'),
    dest:path.join(__dirname,process.env.asset_path,'css'),
    debug: true,
    outputStyle:'extended',
    prefix: '/css',
}));
}
app.use(express.urlencoded());

app.use(cookieParser());

app.use(cors());
//to set up static files
app.use(express.static(process.env.CODEIAL_ASSET_PATH));  
//make the profile uploads path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.options));

//use expressLayout before routes
app.use(expressLayout);
//set style and script for different pages
app.set('layout extractStyles',true);
//setting scripts for different pages
app.set('layout extractScripts',true); 


app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: process.env.CODEIAL_SESSION_COOKIE_KEY,
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({ mongoUrl: 'mongodb://localhost/codeial_development' }),function(err){
        console.log(err || 'connect mongodb setup ok');
    }
    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server at port : ${port}`);
    }
    console.log(`Server is running successfully on port: ${port}`);
    console.log("new environment vriable",process.env.GAURAV_KHEDE);
    console.log(process.env.CODEIAL_GOOGLE_CLIENT_ID);
});
