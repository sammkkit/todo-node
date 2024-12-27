// const sessionIDtoUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "samkitjain"

function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
    }
    return jwt.sign(payload,secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser
}