// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var app = express()
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/img', express.static(__dirname + '/Images'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Controllers
var loginValidation = require('./controller/loginValidation');
var CreateUserAdminController = require('./controller/CreateUserAdminController');
var DeleteUserAdminController = require('./controller/DeleteUserAdminController');
var EditUserAdminController = require('./controller/EditUserAdminController');
var adminViewAllAccounts = require('./controller/adminViewAllAccounts');
var SearchUserAccountAdminController = require('./controller/SearchUserAccountAdminController');
var SearchUserProfileAdminController = require('./controller/SearchUserProfileAdminController');
var addMenuItem = require('./controller/addMenuItem');

//Login Validation
app.use('/UserInfo', loginValidation);

//Administrator: Account Creation
app.use("/createAccount", CreateUserAdminController);

//Administrator: Account Deletion
app.use("/deleteAccount", DeleteUserAdminController);

//Administrator: Account Editing
app.use("/editAccount", EditUserAdminController);

// Administrator: View all Accounts from Database 
app.use("/adminview", adminViewAllAccounts);

// Administrator: Account search
app.use("/adminAccountSearch", SearchUserAccountAdminController);

// Administrator: View all Accounts by specific profile
app.use("/SearchUserProfileAdminController", SearchUserProfileAdminController);

// Manager: Create new menu item
app.use("/addMenuItem", addMenuItem);

// Default landing page
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/menuPage.html'));
});

// insert http://localhost:3000 into browser address bar
server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 