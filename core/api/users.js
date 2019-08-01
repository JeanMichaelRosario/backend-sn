const SocialNetworkError = require('../errors/SocialNetworkError');
const User = require('../../db/models/users');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

    
async function exist(email) {
    const user = await User.findOne({ email });
    if (user) {
        throw new SocialNetworkError(400, 'User already exists');
    }
}

async function encryptPassword(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt(20));
}

function generateToken(id) {
    const payload = {
        user: { id }
    }

    jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: process.env.EXPIRESIN },
        (err, token) => {
            if(err) {
                console.error(err);
                throw new SocialNetworkError(500, err);
            }
            return token;
        }
    );
}

async function register({name, password, email}) {
    try {
        await exist(email);
        
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        console.log(1);
        user = new User({
            name,
            email,
            avatar
        });
        
        user.password = await encryptPassword(password);
        console.log("password");
        await user.save();
        console.log("Saved");
        return generateToken(user.id);
    } catch (error) {
        throw new SocialNetworkError(500, error.message);
    }
}

module.exports = { exist, encryptPassword, generateToken, register };