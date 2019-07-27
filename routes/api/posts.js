const express = require('express');
const router = express.Router();

/**
 * @route           GET api/posts
 * @description     Test route
 * @access          Public
 */

router.get('/', (_, res) => res.send({message: "Dimelo posts"}));


module.exports = router;