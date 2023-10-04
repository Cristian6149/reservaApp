import express from 'express';
import dotenv from 'dotenv'
 import connection from './db/db.js'
import router from './router/rutaHoteles.js';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
const PORT =process.env.PORT;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)

app.listen(PORT,()=>{
    console.log("app use in port", PORT);
})