const express  = require('express');
const router   = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User     =  require('../../model/Users');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const config   = require('config');

/**
 * Route    GET api/users
 * DESC     Test Route
 * Access   Public
 */
router.get('/',(req,res) => res.send('User Route') );

/**
 * Route    Post api/users
 * DESC     Create Route
 * Access   Public
 */
 router.post('/',[
    check('name',' Nmae is required field').not().isEmpty(),
    check('email','Please add a valid email').isEmail(),
    check('password','Minimum 6 character').isLength({min:6})
 ], 
 async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if(user){
           return res.status(400).json({errors:[{msg:"User already exists"}]});
        }

        let  avatar = gravatar.url(email, {s: '200', r: 'pg', d: '404'});

        user = new User({
            name,
            email,
            password,
            avatar
        });

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();



        jwt.sign({
            user : {
               id : user.id
            }
        },
        config.get('jwtSecretCode'), { expiresIn: 60 * 60 * 60 * 60 * 60  } ,(err, token) => {
  
            if(err) throw err;
            return res.status(200).json({token:token});
        });



    } catch(err) {

        console.log(err.message);
        res.status(500).send('Server Error');
        
    }


 });


module.exports = router;
