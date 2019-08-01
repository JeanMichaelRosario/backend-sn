class SocialNetworkError extends Error {
    constructor(number,message) {
        super(message);
        this.number = number;
        this.message = message;
    }
}

module.exports = SocialNetworkError;