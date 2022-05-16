// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

//Administrator: account editing
router.post('/', function(req, res){
    var currentUsername = req.body.currentUsername;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
    console.log('Editing account with old username: ' + currentUsername);
    var db = new sqlite3.Database('./restaurant.db');
    db.run('UPDATE accounts SET first_name = COALESCE(first_name, ?), last_name = COALESCE(last_name, ?), username = ?, password = COALESCE(password, ?), profiletype = ? WHERE Username = ?;',
                                              [fname, lname, username, password, profileType, currentUsername], function(err){
      if(err){
        alert("Error Duplicate Username, Please Choose a different Username")
        console.log(err);
      }
      else{
        alert("Account successfully edited");
        console.log("Account successfully edited");
      }
    });
  });
  module.exports = router;