const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.sendStatus(401);
    }
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.sendStatus(403);
        }
        req.user = decoded.username;
        console.log('HELLO 1 ' + req.user);
        console.log('HELLO 2 ' + decoded.username);
        console.log('HELLO 3 ' , decoded);
        next();
    });
}

module.exports = verifyJWT;