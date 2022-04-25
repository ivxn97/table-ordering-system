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
app.use(express.static(path.join(__dirname,'./public')));


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./loginPage.html'));
});

/*
http.createServer(function (req, res) {
  var url = req.url;
  app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./loginPage.html'));
  });
  if (url ==='/staffPage') {
      res.sendFile(path.join(__dirname,'./loginPage.html'));
      res.end();
  }

}).listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) */

server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 