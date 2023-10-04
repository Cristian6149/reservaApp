import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connection =()=>{
    const uri=process.env.URI
     mongoose.connect(uri,
      { useUnifiedTopology:true })
     .then(()=>console.log("base de datos conectado "))
     .catch((e)=> console.log('error en la connection-> '+'->'+e)); 
}
export default connection();