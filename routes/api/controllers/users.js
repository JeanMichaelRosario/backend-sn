const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }]});
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar
        });
        const salt = await bcrypt.genSalt(20);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: process.env.EXPIRESIN },
            (err, token) => {
                if(err) {
                    console.error(err);
                    throw err;
                }
                res.json({token});
            }
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
    
});


module.exports = router;