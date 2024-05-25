const express=require('express');
const {signUp, login,logout}=require('../controllers/userAuth');
const {requireAuth, requireAdmin}=require('../middleware/middlewares');
const { addTransaction, getUserTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionCrud');
const getAlluser = require('../controllers/admin');
const router=express.Router();
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/logout', logout);
router.get('/home',requireAuth,(req,res)=>{
    
    res.status(200).send('user got verified');
})
router.post('/add', requireAuth, addTransaction);
router.put('/update/:id',requireAuth,updateTransaction)
router.delete('/del/:id',requireAuth,deleteTransaction);
router.get('/all', requireAuth, getUserTransactions);
router.get('/getalluser',requireAuth,requireAdmin,getAlluser);


module.exports=router