const express = require('express');
const router  = express.Router();
const { check, validationResult } = require('express-validator');

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

 ],(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }

    res.send('User Route');

 });


module.exports = router;
