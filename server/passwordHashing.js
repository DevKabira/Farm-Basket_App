const bcrypt = require('bcrypt');

(async () => {
    const hashedPassword = await bcrypt.hash('passw0rd', 10);
    console.log(hashedPassword);
})();