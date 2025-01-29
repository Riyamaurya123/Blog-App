import { User } from "../models/user.model.js"
import cloudinary from 'cloudinary'
import bcrypt from 'bcrypt'
import createTokenAndSaveCookeis from '../jwt/AuthToken.js'

export const register=async (req, res)=>{
    try {
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({
                message: "User Photo id required"
            })
        }
        const {photo}=req.files;
        const allowedFile = ["image/jpeg", "image/png", "image/webp"]
        if(!allowedFile.includes(photo.mimetype)){
            return res.status(400).json({
                message:"Invalide photo formate. only jpg and png are allowed"
            })
        }
        const {name, email, phone, role, password, education}=req.body
        if(!email || !password || !phone ||!role ||!education ||! name ||!photo){
            return res.status(400).json({
                message:"All field are required"
            })
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exists with this email"
            })
        }
        const clodinaryResponse=await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!clodinaryResponse || clodinaryResponse.error){
            console.log(clodinaryResponse.error)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser =new User({
            email,
            name,
            password:hashedPassword,
            phone,
            education,
            role,
            photo:{
                public_id:clodinaryResponse.public_id,
                url:clodinaryResponse.url,
                
            }
        })
       await newUser.save()
       if(newUser){
        const token=await createTokenAndSaveCookeis(newUser._id,res) //signup token
        return res.status(201).json({
            message: "User registered successfully",
            newUser,
            token:token
        })
       }
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}

export const login = async (req,res)=>{
   const {email, password, role}=req.body
   try {
    if(!email || !password ||!role){
        return res.status(400).json({
            message: "Please fill required fields"
        })
    }
    const user =await User.findOne({email}).select("+password");
    if(!user.password){
        return res.status(400).json({
            message:"User Password is missing"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!user ||!isMatch){
        return res.status(400).json({message:"Invalide email or password"})
    }
    if(user.role!==role){
        return res.status(400).json({message :`Given role ${role} not found`})
    }
    const token = await createTokenAndSaveCookeis(user._id,res)   //login token
    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        token:token
    })

    
   } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal Server Error"})
   }
}

export const logout=(req, res)=>{
try {
    res.clearCookie("jwt");
    res.status(200).json({message:"User logged out successfully"})

} catch (error) {
console.log(error)    
return res.status(500).json({message:"Internal Server error"})
}
}


export const getMyProfile=async(req,res)=>{
    const user = await req.user
    res.status(200).json(user)
}


export const getAdmins = async(req,res)=>{
    const admins = await User.find({role:"admin"})
    res.status(200).json(admins)
}