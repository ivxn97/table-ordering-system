// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
var alert = require('alert');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../Images'));

//Login validation
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
    //if (req.body.username && req.body.password) {
      console.log('Checking username: ' + username + ' password: ' + password + ' profile type: ' + profileType);
      var db = new sqlite3.Database('restaurant.db');
      db.get("SELECT * FROM accounts WHERE (username==?) AND (password==?) AND (profiletype==?)", 
                                    [req.body.username, req.body.password, req.body.profileType], function(err,row){
        if (profileType == 'owner') {
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success');
            res.sendFile(path.join(__dirname,'../../public/ownerPage.html'));
        }
        else {
          console.log('Login Failed');
          alert("Login Failed. Please try again.");
          db.close(); 
        }}
        else if (profileType == 'manager') {
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success');
            res.sendFile(path.join(__dirname,'../../public/managerPage.html'));
          }
          else {
            console.log('Login Failed');
            alert("Login Failed. Please try again.");
            db.close(); 
        }}
        else if (profileType == 'staff') {
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success');
            res.sendFile(path.join(__dirname,'../../public/staffPage.html'));
          }
          else {
            console.log('Login Failed');
            alert("Login Failed. Please try again.");
            db.close(); 
        }}
        else if (profileType == 'admin') {
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success');
            res.sendFile(path.join(__dirname,'../../public/adminPage.html'));
          }
          else {
            console.log('Login Failed');
            alert("Login Failed. Please try again.");
            db.close(); 
        }}
        else {
          err = console.log('Error: ' + err)
        }}
      );
    //}
  });
  module.exports = router;