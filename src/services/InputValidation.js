const _Error = require("../models/Error");

class InputValidation {
  isImage(url) {
    const regex = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    if (!regex.test(url)) {
      throw new _Error(422, "Invalid image type");
    }
  }

  isEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      throw new _Error(422, "Invalid e-mail type");
    }
  }

  isValidPassword(password) {
    const regex = /^[^ \\/"'`´~^:;,=]+$/;
    if (!regex.test(password)) {
      throw new _Error(
        422,
        "Invalid password schema"
      );
    }
  }
}

module.exports = InputValidation;
