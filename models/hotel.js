import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    nombre:{
        type:String,
        require:true
    }
});

const newHoteles=mongoose.model('newHoteles',hotelSchema);
export default newHoteles;

