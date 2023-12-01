import User from "../models/User";
import bcrypt from 'bcryptjs' 

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;

    let existingUser;
    try {
        existingUser=await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message:"user already exist"})
    }
    const hashedpassword=bcrypt.hashSync(password);
    const user=new User({
        name,email,
        password:hashedpassword,
        blogs:[]
    });

    
    try {
        user.save()
    } catch (error) {
        return console.log(console.error)
    }
    return res.status(201).json({User})
}

export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try {
        existingUser=await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(400).json({message:"couldn't find user by this email"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"})
    }
    return res.status(200).json({message:"login is successful"})

}