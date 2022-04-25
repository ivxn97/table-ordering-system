// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require ('body-parser');
const res = require('express/lib/response');

var app = express()
var server = http.createServer(app);
var http = require('http');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/img', express.static(__dirname + '/Images'));


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/loginPage.html'));
});

app.get('/staffPage.html', function(req,res){
  res.sendFile(path.join(__dirname,'./public/staffPage.html'));
})

app.get('/ownerPage.html', function(req,res){
  res.sendFile(path.join(__dirname,'./public/ownerPage.html'));
})

app.get('/adminPage.html', function(req,res){
  res.sendFile(path.join(__dirname,'./public/adminPage.html'));
})

app.get('/managerPage.html', function(req,res){
  res.sendFile(path.join(__dirname,'./public/managerPage.html'));
})

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var profileType = req.body.profileType;

  if (req.body.username && req.body.password) {
    console.log('Checking username: ' + username + ' password: ' + password );
    var db = new sqlite3.Database('./restaurant.db');
    db.get("SELECT * FROM accounts where (username==?) AND (password==?)", [req.body.username, req.body.password], function(err,row){
      if(typeof row!=='undefined' && row!=null){ 
        console.log('Login Success')
        res.sendFile(path.join(__dirname,'./public/managerPage.html'))
      }
      else {
        console.log('Login Failed')
        res.sendFile(path.join(__dirname,'./public/loginFailed.html'))
        db.close(); 
      }
    });
  }

});

server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 