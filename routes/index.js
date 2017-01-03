var express = require('express');
var router = express.Router();
var mongoos=require('mongoose');
var app=express();
var connection=mongoos.connect('127.0.0.1:27017/login');
var userSchema=new mongoos.Schema({
    _facebook:String,
    phone:String,
    age:Number
});
var userModel=mongoos.model('user-temp',userSchema);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'facebook_login',condition:true,anyArray:[1,2,3] });

});
router.get('/profile',function (req,res) {
    res.render('profile',{title:'My Profile'});
})

router.get('/view',function (req,res,next) {
    userModel.find().then(function (doc) {
        // res.json(res);
        res.render('index',{items:doc});
    });

/*var view=[userModel];
res.json(view);*/
});
router.post('/insert',function (req,res,next) {
    new userModel({
        _facebook:req.body.facebook,
        phone:req.body.phone,
        age:req.body.age
    }).save(function (err,doc) {
        if (err){
            res.json(err);
        }else{
            res.redirect('/')// can wea add page file
            // res.end()
            // res.send('success full insert')
        }
    });
});
router.get('/:id/update',function (req,res) {
    res.render('/');
});
router.put('/update/:id',function (req,res,next) {
    userModel.update({_id:req.params.id},{
        _facebook:req.body.facebookupdate,
        phone:req.body.phoneupdate,
        age:req.body.ageupdate
    },function (err) {
        if (err){
            res.json(err);
        }else{
            res.redirect('/');
        }
    });
});
router.put('/:id',function (req,res,next) {

    userModel.findById(req.params.id,function(err,doc){
        if (err){

        }else {
            doc._facebook = req.body.facebookupdate;
                doc.phone = req.body.phoneupdate;
                doc.age = req.body.ageupdate;
                doc.save(function (err,saveHand) {
                    if (err){
                        res.send(err);
                    }else{
                        res.redirect('/index');
                    }
                });
        }
    });
});
router.get('/:id/delete',function (req,res,next) {
        // var id=req.body._facebook;
        /*var id={_facebook:req.params.id};*/
        //userModel.findByIdAndRemove({_facebook:req.params.id}).exec();
        userModel.findByIdAndRemove({_id:req.params.id},function (err,doc) {
            if (err){
                res.json(err);
            }else {
                res.redirect('/');
            }
        });

        // userData.remove({'_id':db.id(id)});
        // userData.removeById(id);
    /*var data=new userData(item);
     data.save();*/
    // var insert =userData.insert(item);

    // res.redirect('/');
    });


module.exports = router;
