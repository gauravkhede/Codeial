const express=require('express');
const { default: mongoose } = require('mongoose');


const nestedComment=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
},{
    timestamps:true,
});
const NestedComment=mongoose.model('NestedComment',nestedComment);
module.exports=NestedComment;