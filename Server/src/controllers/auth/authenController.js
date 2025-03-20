const db = require("../../models/index");
const {renderToken , verifyToken} = require("../../services/renderToken");
const LoginController = async(req, res) => {
        const { email, password } = req.body;
        try {
            const user = await db.User.findOne({ where: { email } });
            //check account is exist
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            // check password
            if (user.password !== password) {
                return res.status(400).json({ message: "Invalid password" });
            }
            // check role when user login
            const userToken = await renderToken({ id : user.id , role: user.role });
            res.cookie("token", userToken, {
                httpOnly: true,  
                secure: false,   
                sameSite: "lax", 
                maxAge: 24 * 60 * 60 * 1000,
            });
            
            return res.status(200).json({ 
                message: "Login successful", 
                token : userToken,
                data: user
             });
        } catch (error) {
          console.log(error)
            return res.status(500).json({
                message: "Internal server error", 
                error: error.message
             });

};
}
const RegisterController = async (req, res) => {
  const { full_name, email, password, role } = req.body;
  console.log(req.body);
  // check user exist
  try {
    const checkUser = await db.User.findOne({ where: { email } });
    if (checkUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    // create new User
    const newUser = await db.User.create({ full_name, email, password, role });
    return res.status(200).json({
         message: "User created successfully",
         data : newUser
         });
  } catch (error) {
    return res.status(500).json({
             message: "Internal server error",
             error:error.message

         });
  }
};
const LogoutController = async (req, res) => {
  const checktokenExist = req.cookies.token;
  if(!checktokenExist){
    return res.status(400).json({ message: "Not find Token " });
  }
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { LoginController, RegisterController , LogoutController };