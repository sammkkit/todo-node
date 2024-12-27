const { getUser } = require("../service/auth");

function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    try {
        const user = getUser(token);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = {
    authenticateUser
}