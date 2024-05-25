const express=require('express');
const app=express();
const cors=require('cors');

const cookieParser=require('cookie-parser')
require('dotenv').config();
const connectDB=require('./db/db.js');
const router=require('./routes/routes.js');
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(router);
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`app is on port:${process.env.PORT}`);
});