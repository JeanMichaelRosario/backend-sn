const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../../core/api/users');
const SocialNetworkError = require('../../../core/errors/SocialNetworkError');

/**
 * @route           POST api/users
 * @description     Test route
 * @access          Public
 */

router.post('/', 
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email')
            .isEmail(),
        check('password',
        'Password must have at least 6 character')
            .isLength(6)
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new SocialNetworkError(409, errors.errors);
        }
        const response = await User.register(req.body);
        console.log("Response: ", response);
        res.status(200)
            .send(response);
    }
    catch (error) {
        console.error(error.message);
        if (error instanceof SocialNetworkError) {
            return res.status(error.number).json({ errors: [{ msg: error.message }]});
        } else {
            return res.status(500).send("Server error");
        }
    }
});


module.exports = router;