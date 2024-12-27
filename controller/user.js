const USER = require("../model/user");
const jwt = require("jsonwebtoken");
const {getUser,setUser} = require("../service/auth")


async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: "Name, email, and password are required." 
        });
    }

    try {
        const user = await USER.create({ name, email, password });
        const token = setUser(user);
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.status(201).json({
            message: "User created successfully",
            user,
            token
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ 
            message: "An error occurred while creating the user", 
            error: error.message 
        });
    }
}

async function handleUserLogin(req,res) {
    const { email,password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            message: "email, and password are required." 
        });
    }
    try{
        const user = await USER.findOne({email,password});
        if(!user){
            return res.status(404).json({ 
                message: "user does not exist" 
            });
        }
        const token = setUser(user);
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    }catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "An error occurred during login",
            error: error.message
        });
    }

}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    // getUserInfo
};