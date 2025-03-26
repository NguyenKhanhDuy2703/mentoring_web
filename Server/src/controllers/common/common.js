const db = require("../../models");


const getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll({ attributes: ["full_name", "role"],limit:5});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}
module.exports = {
    getAllUser
}