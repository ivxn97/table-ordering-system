// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../public')));
router.use('/img', express.static(__dirname + '../Images'));

//Login validation
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
      console.log('Checking username: ' + username + ' password: ' + password + ' profile type: ' + profileType);
      var db = new sqlite3.Database('restaurant.db');

        if (profileType == 'owner') {
          db.get("SELECT * FROM owner WHERE (username==?) AND (password==?)", 
          [req.body.username, req.body.password], function(err,row){
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success')
            res.sendFile(path.join(__dirname,'../public/ownerPage.html'))
        }
        else {
          console.log('Login Failed')
          res.sendFile(path.join(__dirname,'../public/loginFailed.html'))
          db.close(); 
        }})}
        else if (profileType == 'manager') {
          db.get("SELECT * FROM manager WHERE (username==?) AND (password==?)", 
          [req.body.username, req.body.password], function(err,row){
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success')
            res.sendFile(path.join(__dirname,'../public/managerPage.html'))
          }
          else {
            console.log('Login Failed')
            res.sendFile(path.join(__dirname,'../public/loginFailed.html'))
            db.close(); 
        }})}
        else if (profileType == 'staff') {
          db.get("SELECT * FROM staff WHERE (username==?) AND (password==?)", 
          [req.body.username, req.body.password], function(err,row){
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success')
            res.sendFile(path.join(__dirname,'../public/staffPage.html'))
          }
          else {
            console.log('Login Failed')
            res.sendFile(path.join(__dirname,'../public/loginFailed.html'))
            db.close(); 
        }})}
        else if (profileType == 'admin') {
          db.get("SELECT * FROM administrator WHERE (username==?) AND (password==?)", 
          [req.body.username, req.body.password], function(err,row){
          if(typeof row!=='undefined' && row!=null){ 
            console.log('Login Success')
            res.sendFile(path.join(__dirname,'../public/adminPage.html'))
          }
          else {
            console.log('Login Failed')
            res.sendFile(path.join(__dirname,'../public/loginFailed.html'))
            db.close(); 
        }})}
        else {
          err = console.log('Error: ' + err)
        }
  });
  module.exports = router;