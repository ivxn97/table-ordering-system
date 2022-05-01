// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require ('body-parser');
const res = require('express/lib/response');
var alert = require('alert');
var app = express()
var server = http.createServer(app);
var http = require('http');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/img', express.static(__dirname + '/Images'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


 app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/menuPage.html'));
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


//Administrator: account creation
app.post('/createAccount', function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var profileType = req.body.profileType;

  console.log('Creating account with first name: ' + fname + ' last name: ' + lname  + ' username: '
                                             + username + ' password: ' + password + ' profile type: ' + profileType);
  var db = new sqlite3.Database('./restaurant.db');
  db.run('INSERT INTO accounts (first_name, last_name, username, password, role) VALUES(?,?,?,?,?)', 
                                                      [fname, lname, username, password, profileType], function(err){
    if(err){
      console.log(err);
    }
    else{
      alert("Account successfully created");
      console.log("Successful account creation");
    }
  });
});

//Administrator: account deletion
app.post('/deleteAccount', function(req, res){
  var username = req.body.username;

  console.log('Deleting account with username: ' + username);
  var db = new sqlite3.Database('./restaurant.db');
  db.run('DELETE FROM accounts WHERE username LIKE ?', [username], function(err){
    if(err){
      console.log(err);
    }
    else{
      alert("Account successfully deleted");
      console.log("Successful account deletion");
    }
  });
});

//Administrator: account editing
app.post('/editAccount', function(req, res){
  var oldUsername = req.body.oldUsername;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var username = req.body.username;
  var password = req.body.password;
  var profileType = req.body.profileType;

  console.log('Editing account with old username: ' + oldUsername);
  var db = new sqlite3.Database('./restaurant.db');
  db.run('UPDATE accounts SET first_name = COALESCE(first_name, ?), last_name = COALESCE(last_name, ?), username = COALESCE(username, ?), password = COALESCE(password, ?), role = ? WHERE username = ?;',
                                            [fname, lname, username, password, profileType, oldUsername], function(err){
    if(err){
      console.log(err);
    }
    else{
      alert("Account successfully edited");
      console.log("Account successfully edited");
    }
  });
});


// Administrator: View all Accounts from Database 
app.post('/adminView', (req, res) => {
  var db = new sqlite3.Database('./restaurant.db');
  db.all("SELECT * FROM accounts", (error, rows) => {
      if (error){
          console.log(error);
      }
      res.render('adminView', {accounts: rows});
  });
})

// Administrator: Account search
app.post('/adminAccountSearch', (req, res) => {
  var username = req.body.username;
  var db = new sqlite3.Database('./restaurant.db');
  db.get("SELECT * FROM accounts WHERE username = ?", [username], (error, rows) => {
      if (error){
          console.log(error);
      }
      console.log({accounts: rows});
      res.render('adminAccountSearch', {accounts: rows});
  });
})

// Administrator: View all accounts by specific profile
app.post('/adminViewProfiles', (req, res) => {
  var profileType = req.body.profileType;
  var db = new sqlite3.Database('./restaurant.db');
  db.all("SELECT * FROM accounts WHERE role = ?", [profileType], (error, rows) => {
      if (error){
          console.log(error);
      }
      console.log({accounts: rows});
      res.render('adminViewProfiles', {accounts: rows});
  });
})

server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 