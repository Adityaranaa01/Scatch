const userModel = require('../models/user-model')
const ownerModel = require('../models/owner-model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generatetoken')

module.exports.registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User already exists.");
      return res.redirect("/");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const createdUser = await userModel.create({
      email,
      fullname,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(createdUser);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/shop");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong.");
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in both userModel and ownerModel
    let user =
      (await userModel.findOne({ email })) ||
      (await ownerModel.findOne({ email }));

    if (!user) {
      req.flash("error", "User does not exist.");
      return res.redirect("/");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/");
    }

    // Generate token and set cookie
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/shop");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong.");
    return res.redirect("/");
  }
};

module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).redirect("/")
}