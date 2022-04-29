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

// app.get('/loginPage.html', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/loginPage.html'));
// });
// app.get('/staffPage.html', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/staffPage.html'));
// })
// app.get('/ownerPage.html', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/ownerPage.html'));
// })
// app.get('/adminPage.html', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/adminPage.html'));
// })
// app.get('/managerPage.html', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/managerPage.html'));
// })


//Login validation
app.post('/UserInfo', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var profileType = req.body.profileType;

  //if (req.body.username && req.body.password) {
    console.log('Checking username: ' + username + ' password: ' + password + ' profile type: ' + profileType);
    var db = new sqlite3.Database('./restaurant.db');
    db.get("SELECT * FROM accounts where (username==?) AND (password==?) AND (role==?)", 
                                  [req.body.username, req.body.password, req.body.profileType], function(err,row){
      if (profileType == 'owner') {
        if(typeof row!=='undefined' && row!=null){ 
          console.log('Login Success')
          res.sendFile(path.join(__dirname,'./public/ownerPage.html'))
      }
      else {
        console.log('Login Failed')
        res.sendFile(path.join(__dirname,'./public/loginFailed.html'))
        db.close(); 
      }}
      else if (profileType == 'manager') {
        if(typeof row!=='undefined' && row!=null){ 
          console.log('Login Success')
          res.sendFile(path.join(__dirname,'./public/managerPage.html'))
        }
        else {
          console.log('Login Failed')
          res.sendFile(path.join(__dirname,'./public/loginFailed.html'))
          db.close(); 
      }}
      else if (profileType == 'staff') {
        if(typeof row!=='undefined' && row!=null){ 
          console.log('Login Success')
          res.sendFile(path.join(__dirname,'./public/staffPage.html'))
        }
        else {
          console.log('Login Failed')
          res.sendFile(path.join(__dirname,'./public/loginFailed.html'))
          db.close(); 
      }}
      else if (profileType == 'admin') {
        if(typeof row!=='undefined' && row!=null){ 
          console.log('Login Success')
          res.sendFile(path.join(__dirname,'./public/adminPage.html'))
        }
        else {
          console.log('Login Failed')
          res.sendFile(path.join(__dirname,'./public/loginFailed.html'))
          db.close(); 
      }}
      else {
        err = console.log('Error: ' + err)
      }}
    );
  //}
});


//Admin profile creation
app.post('/createProfile', function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var profileType = req.body.profileType;

  console.log('Creating account with first name: ' + fname + ' last name' + lname  + ' username: ' + username + ' password: ' + password + ' profile type: ' + profileType);
  var db = new sqlite3.Database('./restaurant.db');
  db.run('INSERT INTO accounts (first_name, last_name, username, password, role) VALUES(?,?,?,?,?)', [fname, lname, username, password, profileType], function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successful account creation");
    }
  });

});


server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 