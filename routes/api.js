var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('./models/model.js');
/* GET home page. */

router.post('/',function(req,res,next){
    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var address = req.body.address;

    var newContact = new Contact({
        name:name,
        email:email,
        number:number,
        address:address
    });
    newContact.save(function(err,doc){
        if (err) throw err;
        else{
            console.log('Saved');
            res.json(doc);
        }
    });
});

router.get('/', function(req, res, next) {
  Contact.find({}).exec(function(err,doc){
    if (err) throw err;
    else{
        console.log(doc);
        res.json(doc);

    }
  }); 
  });

router.get('/delete/:id',function(req,res,next){
    Contact.findOneAndRemove({_id:req.params.id},function(err){
        if (err) throw err;
        else{
            Contact.find({}).exec(function(err,doc){
                if (err) throw err;
                else{
                    res.json(doc);
                }
            });
        }
    });
});

router.get('/updatedata/:id',function(req,res,next){
    Contact.findOneAndUpdate({_id:req.params.id},
                             {$set:{ name: req.body.name , email : req.body.email , number : req.body.number ,address : req.body.address }},
                             {upsert:true},
                             function(err,doc){
        if (err) throw err;
        else{
            res.json(doc);
        }
    });
});

router.get('*', function(req, res, next) {
  res.sendFile('../public/index.html');
});

module.exports = router;
