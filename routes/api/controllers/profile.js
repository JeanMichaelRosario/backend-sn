const express = require('express');
const router = express.Router();

/**
 * @route           GET api/profile
 * @description     Test route
 * @access          Public
 */

router.get('/', (_, res) => res.send({message: "Dimelo profile"}));


module.exports = router;