const jwt    = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({errors:{msg:"Auth token is missing!"}});
    }

    try{

      const decoded =  jwt.verify(token,config.get('jwtSecretCode'));
      req.user = decoded.user;
      return next();

    } catch(err) {
        console.error(err.message);
        res.status(400).json({ errors : {msg:"Invalid Access Token"}});
    }

};
