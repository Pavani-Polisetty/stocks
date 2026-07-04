const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        const jwtToken = token.split(" ")[1];

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Not Authorized",
        });

    }
};

module.exports = protect;