const db = require("../../models");

const getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll({ attributes: ["full_name", "role"],limit:5});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

const searchEverything = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const users = await db.User.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { full_name: { [db.Sequelize.Op.like]: `%${query}%` } },
                    { role: { [db.Sequelize.Op.like]: `%${query}%` } }
                ]
            }
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





const searchTags = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        // Tìm kiếm trong bảng Tag
        const tags = await db.Tag.findAll({
            where: {
                name: { [db.Sequelize.Op.like]: `%${query}%` } // Tìm kiếm với cú pháp LIKE
            }
        });

        return res.status(200).json(tags); // Trả về kết quả tìm kiếm
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllUser,
    searchEverything,
    searchTags
}