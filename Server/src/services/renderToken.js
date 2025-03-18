const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;
const expiresIn = process.env.ACCESS_TOKEN_LIFE;

const renderToken = ({ id , role }) => {
    try {
        return jwt.sign({id , role }, secret, { expiresIn });
    } catch (err) {
        console.error("JWT Sign Error:", err);
        throw err;
    }
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Verify Error:", err);
        throw err;
    }
};

module.exports = { renderToken, verifyToken };
