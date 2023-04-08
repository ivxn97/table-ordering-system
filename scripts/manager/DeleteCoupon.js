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

//Manager: coupon deletion
router.post('/', function(req, res){
  var couponCode = req.body.couponCode;

  console.log('Deleting coupon with name ' + couponCode);
  var db = new sqlite3.Database('./restaurant.db');
  db.run('DELETE FROM coupon WHERE coupon_code LIKE ?', [couponCode], function(err){
    if(err){
      console.log(err);
    }
    else{
      alert("Coupon code successfully deleted");
      console.log("Successful coupon code deletion");
    }
  });
});
module.exports = router;