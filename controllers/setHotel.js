import newHoteles from "../models/hotel.js";
import  modelUsuarios  from "../models/user.js"
import isAuthenticated from "../middleware/auth.js"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
console.log(bcrypt)
const setters = (app)=>{

    //AGREGAR
    app.post('/',async (req,res)=>{
        const newHotel = new newHoteles(req.body);
        try{
          const arrayHotel = await newHotel.save();
          console.log(arrayHotel);
          res.status(201).json(arrayHotel)
        }catch(e){
            res.status(500).json(e);
        }
    })
    
    //UPDATE
    app.put('/:id',async (req,res)=>{
        try{
            const updateHotel = await newHoteles.findByIdAndUpdate(req.params.id,{$set:req.body})
            res.status(200).json(updateHotel)
        }catch(e){
            res.status(500).json(e);
        }
    })

     //DELETE
     app.delete('/:id',async (req,res)=>{
        try{
            const deleteHotel = await newHoteles.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteHotel)
        }catch(e){
            res.status(500).json(e);
        }
    })

    //GET
    app.get('/:id',async (req,res)=>{
        try{
            const getHotel = await newHoteles.findById(req.params.id)
            res.status(200).json(getHotel)
        }catch(e){
            res.status(500).json(e);
        }
    })

    //GET ALL
app.get('/',isAuthenticated,async (req,res)=>{
        try{
            const getHotel = await newHoteles.find()
            res.status(200).json(getHotel)
        }catch(e){
            res.status(500).json(e);
        }
    })

    app.post('/register', async(req,res)=>{
        try {
          const { name, email, password } = req.body;
          //Check emptyness of the incoming data
          if (!name || !email || !password) {
              return res.json({ message: 'Please enter all the details' })
          }
          console.log(req.body)
          //Check if the user already exist or not
          const userExist = await modelUsuarios.findOne({ email: req.body.email });
          if (userExist) {
              return res.json({ message: 'User already exist with the given emailId' })
          }
       
          //Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hashSync(`${req.body.password}`, salt);
          req.body.password = hashPassword;
          const user = new modelUsuarios(req.body);
          await user.save();
          
          return res.json({ success: true, message: 'User registered successfully', data: user })
      } catch (error) {
          return res.json({ "message ": error });
      }
             
      })


      app.post('/login',async(req,res)=>{
        try {
          const { email, password } = req.body;
          console.log(email)
          //Check emptyness of the incoming data
          if (!email || !password) {
              return res.json({ message: 'Please enter all the details' })
          }
          //Check if the user already exist or not
          const userExist = await modelUsuarios.findOne({ email: req.body.email });
          if (!userExist) {
              return res.json({ message: 'Wrong credentials' })
          }
          //Check password match
          const isPasswordMatched = await bcrypt.compareSync(`${password}`, userExist.password);
          console.log(isPasswordMatched)
          if (!isPasswordMatched) {
              return res.json({ message: 'Wrong credentials pass' });
          }
          process.env.JWT_EXPIRE="1d"
          const token =  jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
              expiresIn: process.env.JWT_EXPIRE,
          });
          
          return res.cookie("token",token).json({ success: true, message: 'LoggedIn Successfully', token: token })
           } catch (error) {
             return res.json({ error: error });
           }
          })


}

export default setters;