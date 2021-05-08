const express = require('express');
const router  = express.Router();
const auth    = require('../../middleware/auth');

/**
 * Route    GET api/users
 * DESC     Test Route
 * Access   Public
 */
router.get('/', auth, (req,res) => {

    res.send('Post Route Protected Auth');

});


module.exports = router;