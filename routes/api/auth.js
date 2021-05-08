const express = require('express');
const User    = require('../../model/Users');
const router  = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const config   = require('config');
/**
 * Route    GET api/users
 * DESC     Test Route
 * Access   Public
 */
router.post('/',[

    check('email','Email is required for Login').not().isEmpty(),
    check('password','Password min length should be 6').isLength({min:6})

], async(req,res) => {
    
    var errors =  validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    var email      =  req.body.email;
    var password   =  req.body.password;


    var user = await User.findOne({email}).select('password');
    var auth =  await bcrypt.compare(password,user.password);

    if(!auth){
        res.status(400).json({errors:{"msg":"Sorry the credentials does not match"}}); 
    }
    

    jwt.sign({

        user:{
            id:user.id
        }

    },config.get('jwtSecretCode'),(err,token) => {

        if(err) throw err;

        return res.json({token});

    });
    

});

module.exports = router;