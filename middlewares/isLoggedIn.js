const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You are not logged in.");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // First try userModel
    let user = await userModel.findOne({ email: decoded.email }).select("-password");

    // If not found, try ownerModel
    if (!user) {
      user = await ownerModel.findOne({ email: decoded.email }).select("-password");
    }

    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};
