const express = require('express');
const router = express.Router();

/**
 * @route           GET api/auth
 * @description     Test route
 * @access          Public
 */

router.get('/', (_, res) => res.send({message: "Dimelo auth"}));


module.exports = router;