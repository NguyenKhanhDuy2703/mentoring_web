 const db = require("../../models/index");
const getAllTags  = async (req, res ) => {
    try {
        const listTags = await db.Tag.findAll({ attributes: ['name'] });
        
        if (!listTags) {
            return res.status(404).json({ message: "No tags found" });
        }
        return res.status(200).json({ message: "Tags retrieved successfully", data: listTags });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports = { getAllTags}