const bcrypt = require("bcryptjs");

class HashManager {

    async hash(plainText) {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(plainText, salt);
        return result;
    }

    async compare(plainText, hash) {
        return await bcrypt.compare(plainText, hash);
    }

}

module.exports = HashManager