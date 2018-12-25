const express =require('express');
const jwt =require('jsonwebtoken');

const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:'wecolme to the Api'
    });
});

app.post('/api/posts',verifiedToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Posts Created ...',
                authData
            })
        }
    });
});

app.post('/api/login',(req,res)=>{
    const user={
        id: 1,
        username: 'anu',
        email: 'anu@gmail.com'
    }

    jwt.sign({user},'secretkey',(err,token) =>{
        res.json({
            token
        });
    });
});

//verifiedToken

function verifiedToken(req,res,next){

    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
       const bearer = bearerHeader.split(' ');
       const bearerToken= bearer[1];
       req.token =bearerToken;
       next();

    } else{
        res.sendStatus(403)
    }
}


app.listen(3000,() =>{console.log("server is listening on port 3000")})