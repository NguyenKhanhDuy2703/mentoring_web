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
        console.log(checkUser)
        if(!checkUser){
            return res.status(401).json({ message: "You not login" });
        }
        req.data = checkUser;
       next();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
    
};

const authenticationRole  =  ( role )=> {
  
    return async ( req , res , next ) => {
        if(!role.includes(req.data.role)){
            return res.status(403).json({ message: "You not permission " });
        }
        req.data = {full_name : req.data.full_name  , role : req.data.role};
        next();
    }
    
}
module.exports = { authenticateLogin , authenticationRole };
