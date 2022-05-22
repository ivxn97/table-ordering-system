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
var loginValidation = require('./controller/login/LoginAccountController');
var CreateUserAdminController = require('./controller/admin/CreateUserController');
var DeleteUserAdminController = require('./controller/admin/DeleteUserController');
var EditUserAdminController = require('./controller/admin/EditUserController');
var adminViewAllAccounts = require('./controller/admin/ViewAllController');
var SearchUserAccountAdminController = require('./controller/admin/SearchUserAccountController');
var SearchUserProfileAdminController = require('./controller/admin/SearchUserProfileController');
var addMenuItem = require('./controller/manager/CreateMenuController');
var deleteMenuItem = require('./controller/manager/DeleteMenuController');
var editMenuItem = require('./controller/manager/EditMenuController');
var searchMenuItem = require('./controller/manager/SearchMenuController');
var addCouponCode = require('./controller/manager/CreateCouponController');
var deleteCouponCode = require('./controller/manager/DeleteCouponController');
var editCouponCode = require('./controller/manager/EditCouponController');
var viewCouponCode = require('./controller/manager/ViewCouponController');
var searchCouponCode = require('./controller/manager/SearchCouponController');
var menuRender = require('./controller/menu/MenuRenderController');
var addToCart = require('./controller/menu/AddToCartController');
var viewCart = require('./controller/menu/ViewCartController');
var deleteOrder = require('./controller/staff/DeleteOrderController');
var editOrder = require('./controller/staff/EditOrderController');
var editOrderStatus = require('./controller/staff/EditOrderStatusController');
var searchOrder = require('./controller/staff/SearchOrderController');
var viewOrder = require('./controller/staff/ViewOrderController');
var kitchenOrder = require('./controller/menu/KitchenOrderController');
var emptyCart = require('./controller/menu/EmptyCartController');
var dailyReport = require('./controller/owner/DailyReportController');
var weeklyReport = require('./controller/owner/WeeklyReportController');
var monthlyReport = require('./controller/owner/MonthlyReportController');

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