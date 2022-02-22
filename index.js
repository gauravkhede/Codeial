const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
//include library for layouts
const expressLayout=require('express-ejs-layouts');

const db=require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());
//to set up static files
app.use(express.static('./assets'));       

//use expressLayout before routes
app.use(expressLayout);
//set style and script for different pages
app.set('layout extractStyles',true);
//setting scripts for different pages
app.set('layout extractScripts',true); 
//use express router
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server at port : ${port}`);
    }
    console.log(`Server is running successfully on port: ${port}`);
});
