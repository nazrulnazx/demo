const express = require('express');
const router  = express.Router();


/**
 * Route    GET api/users
 * DESC     Test Route
 * Access   Public
 */
router.get('/',(req,res) => res.send('Post Route') );


module.exports = router;