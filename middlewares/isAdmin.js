const ownerModel = require('../models/owner-model')

module.exports = async (req, res, next) => {
  try {

    if (!req.user) {
      req.flash("error", "You must be logged in first.")
      return res.redirect("/users/login")
    }

    const owner = await ownerModel.findOne({ email: req.user.email })

    if (!owner) {
      req.flash("error", "You are not authorized to access this route.")
      return res.redirect("/")
    }

    next()
  } catch (err) {
    console.error(err)
    req.flash("error", "Something went wrong.")
    return res.redirect("/")
  }
}
