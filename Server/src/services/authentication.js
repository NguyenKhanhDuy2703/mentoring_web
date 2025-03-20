const {verifyToken} = require("./renderToken")
const db = require("../models/index")
const authenticateLogin = async (req, res, next) => {
    const token = req.cookies.token; // Lấy token từ cookie
    try {
        if (!token) {
            return res.status(401).json({ message: "Not Found Token " });
        }
        // verify token
         const checktoken = verifyToken(token);
        const checkUser =  await db.User.findOne({where : {id : checktoken.id}})
        if(!checkUser){
            return res.status(401).json({ message: "You not login" });
        }
        req.data = {user : checkUser.dataValues, token  : token};
       next();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
    
};

const authenticationRole  =  ( role )=> {
    return async ( req , res , next ) => {
        try {
            const userCookies = req.data.token;
           
        const checktoken = verifyToken(userCookies);
        if(!role.includes(checktoken.role)){
            return res.status(403).json({ message: "You not permission " });
        }
        const { id , full_name , email , role : roleUser} = req.data.user;
        req.data = {id , full_name  ,email, role : roleUser};
        } catch (error) {
            return res.status(403).json({ message: error.message });    
        }
        next();
    }
    
}
module.exports = { authenticateLogin , authenticationRole };
