var express = require('express');
var router = express.Router();
var bp	= require('body-parser');
const request = require('request');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', status: "", details: "" });
});


router.post('/action', function(req, res, next) {
   
 
   let  bvnCode = req.body.bvn;

   var options = {
   	url: 'https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/'+bvnCode+'?seckey=FLWSECK-345d9cda739f94e4ef065bbfe6f6c964-X',
   	headers: 'content-type: application/json',
   	method: 'GET'
   };


   function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
      res.render('index', { title: 'Express', status: info.status, details: " Your BVN has been verfied "+info.data.first_name+" "+info.data.last_name  });
  }
}


   request.get(options, callback);
 
 });


module.exports = router;
