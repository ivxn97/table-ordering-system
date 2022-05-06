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
var addCouponCode = require('./controller/addCouponCode');
var deleteCouponCode = require('./controller/deleteCouponCode');
var editCouponCode = require('./controller/editCouponCode');
var viewCouponCode = require('./controller/viewCouponCode');
var searchCouponCode = require('./controller/searchCouponCode');

//LOGIN PAGE
//Login Validation
app.use('/UserInfo', loginValidation);

//ADMINISTRATOR PAGE
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

//MANAGER PAGE
// Manager: Create new menu item
app.use("/addMenuItem", addMenuItem);
// Manager: Add coupon code
app.use("/addCouponCode", addCouponCode);
// Manager: Delete coupon code
app.use("/deleteCouponCode", deleteCouponCode);
// Manager: Edit coupon code
app.use("/editCouponCode", editCouponCode);
// Manager: View coupon code
app.use("/viewCouponCode", viewCouponCode);
// Manager: Search coupon code
app.use("/searchCouponCode", searchCouponCode);

// Default landing page
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/menuPage.html'));
});

// insert http://localhost:3000 into browser address bar
server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 