// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../public')));
router.use('/img', express.static(__dirname + '../Images'));

//Administrator: account creation
router.post('/', function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
    console.log('Creating account with first name: ' + fname + ' last name: ' + lname  + ' username: '
                                               + username + ' password: ' + password + ' profile type: ' + profileType);
    var db = new sqlite3.Database('restaurant.db');

    if (profileType == 'owner') {
      db.run('INSERT INTO owner (first_name, last_name, username, password) VALUES(?,?,?,?)', 
      [fname, lname, username, password], function(err){
      if(err){
        alert("Error Duplicate Username, Please Choose a different Username")
        console.log(err);
      }
      else {
        alert("Account successfully created");
        console.log("Successful account creation");
    }})}
    else if (profileType == 'manager') {
      db.run('INSERT INTO manager (first_name, last_name, username, password) VALUES(?,?,?,?)', 
      [fname, lname, username, password], function(err){
      if(err){
        alert("Error Duplicate Username, Please Choose a different Username")
        console.log(err);
      }
      else {
        alert("Account successfully created");
        console.log("Successful account creation");
    }})}
    else if (profileType == 'staff') {
      db.run('INSERT INTO staff (first_name, last_name, username, password) VALUES(?,?,?,?)', 
      [fname, lname, username, password], function(err){
      if(err){
        alert("Error Duplicate Username, Please Choose a different Username")
        console.log(err);
      }
      else{
        alert("Account successfully created");
        console.log("Successful account creation");
    }})}
    else if (profileType == 'admin') {
      db.run('INSERT INTO administrator (first_name, last_name, username, password) VALUES(?,?,?,?)', 
      [fname, lname, username, password], function(err){
      if(err){
        alert("Error Duplicate Username, Please Choose a different Username")
        console.log(err);
      }
      else{
        alert("Account successfully created");
        console.log("Successful account creation");
    }})}
    else {
      consoele.log(err);
      db.close();
    }
  });
  module.exports = router;