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
var loginValidation = require('./controller/LoginAccountController');
var CreateUserAdminController = require('./controller/CreateUserController');
var DeleteUserAdminController = require('./controller/DeleteUserController');
var EditUserAdminController = require('./controller/EditUserController');
var adminViewAllAccounts = require('./controller/ViewAllController');
var SearchUserAccountAdminController = require('./controller/SearchUserAccountController');
var SearchUserProfileAdminController = require('./controller/SearchUserProfileController');
var addMenuItem = require('./controller/CreateMenuController');
var deleteMenuItem = require('./controller/DeleteMenuController');
var editMenuItem = require('./controller/EditMenuController');
var searchMenuItem = require('./controller/SearchMenuController');
var addCouponCode = require('./controller/CreateCouponController');
var deleteCouponCode = require('./controller/DeleteCouponController');
var editCouponCode = require('./controller/EditCouponController');
var viewCouponCode = require('./controller/ViewCouponController');
var searchCouponCode = require('./controller/SearchCouponController');
var menuRender = require('./controller/MenuRenderController');
var addToCart = require('./controller/AddToCartController');
var viewCart = require('./controller/ViewCartController');
var receipt = require('./controller/ReceiptController');
/*var deleteOrder = require('./controller/DeleteOrderController');
var editOrder = require('./controller/EditOrderController');
var editOrderStatus = require('./controller/EditOrderStatusController');
var searchOrder = require('./controller/SearchOrderController');
var viewOrder = require('./controller/ViewOrderController');*/

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
/*app.use("/deleteOrder", deleteOrder);
app.use("/editOrder", editOrder);
app.use("/editOrderStatus", editOrderStatus);
app.use("/searchOrder", searchOrder);
app.use("/viewOrder", viewOrder);*/


//MENU PAGE
// Default landing page
app.use("/", menuRender);

//Back
app.use("/menuBack", menuRender);

//Menu: Add To Cart
app.use("/addToCart", addToCart);

//Menu: View Cart
app.use("/viewCart", viewCart);

//Menu: Display Receipt 
app.use("/checkoutSuccess", receipt);

// insert http://localhost:3000 into browser address bar
server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
}) 