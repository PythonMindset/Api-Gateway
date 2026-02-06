const crypto = require('crypto');

function generateRandomPassword() {
    const length = 10;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
}

module.exports = {
    generateRandomPassword
};