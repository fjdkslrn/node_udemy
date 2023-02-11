const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res){
    res.send('<h1>'+ new Date().toISOString() +'</h1>');
});

app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="userName" /><button>Submit</button></form>');
});

app.get('/users', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');
    
    const fileData = fs.readFileSync(filePath);  // 텍스트
    const existingUsers = JSON.parse(fileData);  // JSON 배열로 변경

    let responseData = '<ul>';

    for(const user of existingUsers){
        responseData += '<li>' + user + '</li>';
    }

    responseData += '</ul>';

    res.send(responseData);
});

app.post('/store-user', function(req, res){
    const userName = req.body.userName;
    
    const filePath = path.join(__dirname, 'data', 'users.json');
    
    const fileData = fs.readFileSync(filePath);  // 텍스트
    const existingUsers = JSON.parse(fileData);  // JSON 배열로 변경

    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send('<h1>Username stored!</h1>');
});



app.listen(3000);
