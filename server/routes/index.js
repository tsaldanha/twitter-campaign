let express = require('express');
let router = express.Router();

// user
router.use('/user', require('./users'));
//campaign
router.use('/campaign', require('./campaign'));

module.exports = router