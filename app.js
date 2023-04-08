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
var loginValidation = require('./scripts/login/LoginAccount');
var CreateUserAdmin = require('./scripts/admin/CreateUser');
var DeleteUserAdmin = require('./scripts/admin/DeleteUser');
var EditUserAdmin = require('./scripts/admin/EditUser');
var adminViewAllAccounts = require('./scripts/admin/ViewAll');
var SearchUserAccountAdmin = require('./scripts/admin/SearchUserAccount');
var SearchUserProfileAdmin = require('./scripts/admin/SearchUserProfile');
var addMenuItem = require('./scripts/manager/CreateMenu');
var deleteMenuItem = require('./scripts/manager/DeleteMenu');
var editMenuItem = require('./scripts/manager/EditMenu');
var searchMenuItem = require('./scripts/manager/SearchMenu');
var addCouponCode = require('./scripts/manager/CreateCoupon');
var deleteCouponCode = require('./scripts/manager/DeleteCoupon');
var editCouponCode = require('./scripts/manager/EditCoupon');
var viewCouponCode = require('./scripts/manager/ViewCoupon');
var searchCouponCode = require('./scripts/manager/SearchCoupon');
var menuRender = require('./scripts/menu/MenuRender');
var addToCart = require('./scripts/menu/AddToCart');
var viewCart = require('./scripts/menu/ViewCart');
var deleteOrder = require('./scripts/staff/DeleteOrder');
var editOrder = require('./scripts/staff/EditOrder');
var editOrderStatus = require('./scripts/staff/EditOrderStatus');
var searchOrder = require('./scripts/staff/SearchOrder');
var viewOrder = require('./scripts/staff/ViewOrder');
var kitchenOrder = require('./scripts/menu/KitchenOrder');
var emptyCart = require('./scripts/menu/EmptyCart');
var dailyReport = require('./scripts/owner/DailyReport');
var weeklyReport = require('./scripts/owner/WeeklyReport');
var monthlyReport = require('./scripts/owner/MonthlyReport');

//LOGIN PAGE
//Login Validation
app.use('/UserInfo', loginValidation);

//ADMINISTRATOR PAGE
//Administrator: Account Creation
app.use("/createAccount", CreateUserAdmin);
//Administrator: Account Deletion
app.use("/deleteAccount", DeleteUserAdmin);
//Administrator: Account Editing
app.use("/editAccount", EditUserAdmin);
// Administrator: View all Accounts from Database 
app.use("/adminview", adminViewAllAccounts);
// Administrator: Account search
app.use("/adminAccountSearch", SearchUserAccountAdmin);
// Administrator: View all Accounts by specific profile
app.use("/SearchUserProfileAdminController", SearchUserProfileAdmin);

//MANAGER PAGE
// Manager: Create new menu item
app.use("/addMenuItem", addMenuItem);
// Manager: Delete menu item
app.use("/deleteMenuItem", deleteMenuItem);
// Manager: Edit menu item
app.use("/editMenuItem", editMenuItem);
// Manager: Search menu item
app.use("/searchMenuItem", searchMenuItem);
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

//STAFF PAGE
// Staff: Delete Order
app.use("/deleteOrder", deleteOrder);
// Staff: Edit Order
app.use("/editOrder", editOrder);
// Staff: Edit Order Status
app.use("/editOrderStatus", editOrderStatus);
// Staff: Search Order
app.use("/searchOrder", searchOrder);
// Staff: View Orders
app.use("/staffView", viewOrder);


//MENU PAGE
// Default landing page
app.use("/", menuRender);
// Back to menu
app.use("/menuBack", menuRender);
// Menu: Add To Cart
app.use("/addToCart", addToCart);
// Menu: View Cart
app.use("/viewCart", viewCart);
// Menu: Display Receipt 
app.use("/checkoutSuccess", kitchenOrder);
// Menu: Empty Cart and go back to menu
app.use("/emptyCart", emptyCart);

//OWNER PAGE
// Owner: Daily Report
app.use("/daily", dailyReport);
// Owner: Weekly Report
app.use("/weekly", weeklyReport);
// Owner: Monthly Report
app.use("/monthly", monthlyReport);

// insert http://localhost:3000 into browser address bar
server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 
module.exports = server;