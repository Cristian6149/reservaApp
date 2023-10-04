import mongoose from "mongoose";

const usuarios=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:[4,'Name should be minimum of 4 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password should be minimum of 8 characters']
    },
    rol:{
        type:String,
        require:true,
        minLength:[4,'Rol should be minimum of 4 characters']
    }
})

const modelUsuarios = mongoose.model('usersHotel',usuarios);
export default modelUsuarios;