var express=require("express");
var router=express.Router();
router.get('/',function (req,res,next) {
  res.render('login',{title:'登录',layout:'layout'});
  next();
});
router.post('/:username,:password',function (req,res,next) {
  if(req.params.username){
    res.render('login',{title:'登录',layout:'layout'});
  }else{
    next();

  }
});

module.exports=router;
