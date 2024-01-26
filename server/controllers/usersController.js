const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already present", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (err) {
    console.log("error while creating user: ", err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "user doesn't exist!", status: false });
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid)
      return res.json({ msg: "incorrect password!", status: false });
    delete user.password;
    return res.json({ user, status: true });
  } catch (err) {
    console.log("error while creating user: ", err);
    next(err);
  }
};

