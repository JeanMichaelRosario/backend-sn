const express = require('express');
const router = express.Router();

/**
 * @route           GET api/users
 * @description     Test route
 * @access          Public
 */

router.get('/', (_, res) => res.send({message: "Dimelo users"}));


module.exports = router;