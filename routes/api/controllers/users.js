const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

/**
 * @route           POST api/users
 * @description     Test route
 * @access          Public
 */

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password',
    'Password must have at least 6 character')
        .isLength(6)
],(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send({message: "Dimelo users"})
});


module.exports = router;