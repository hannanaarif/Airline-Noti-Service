const express=require('express');
const {InfoController,EMAILCONTROLLER}=require('../../controllers');
const router=express.Router();

console.log("Reached V1");


router.get('/info',InfoController.info);
router.post('/tickets',EMAILCONTROLLER.create);


module.exports=router;