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

//Manager: coupon edit
router.post('/', function(req, res){
    var couponCode = req.body.couponCode;
    var discount = req.body.discount;
   
    console.log('Editing coupon discount with old coupon code: ' + couponCode);
    var db = new sqlite3.Database('./restaurant.db');
    db.run('UPDATE coupon SET discount = ? WHERE coupon_code = ?;',[discount, couponCode], function(err){
      if(err){
        alert("Error editing discount of coupon code")
        console.log(err);
      }
      else{
        alert("Coupon code successfully edited");
        console.log("Coupon code successfully edited");
      }
    });
  });
  module.exports = router;