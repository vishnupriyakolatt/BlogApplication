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
       await user.save()
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({user})
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (!existingUser) {
      return res.status(400).json({ message: "Couldn't find user by this email" });
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
  
    const userId = existingUser._id;

    return res.status(200).json({ userId, message: "Login is successful" });
  };
  