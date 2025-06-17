const { response, request } = require("express");
const bcrypt =require("bcrypt");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (request, response) => {
    const {username,email,password}=request.body;
    if(!username || !email || !password){
        response.status(400);
        throw new Error("All fields are Mandatory!");
    }

    const userAvailable = await UserActivation.findOne({email});
    if(userAvailable){
        response.status(400);
        throw new Error("User already exists!")
    }

    //hash passward
    const hashedPassword= await bcrypt.hash(password,10);
    const user = await UserActivation.create({
        username,
        email,
        password:hashedPassword,
    });

    if(user){
        response.status(201).json({_id:user.id,email: user.email});
    }else{
        response.status(400);
        throw new Error ("User data is not valid");
    }
  response.json({ message: "Register the user" });
});

const loginUser= asyncHandler(async(request,response)=>{
    response.json({message:'Login user'})
});

const currentUser =asyncHandler(async(request,response)=>{
    response.json({message:'Current User'})
})

module.exports={registerUser,loginUser,currentUser};