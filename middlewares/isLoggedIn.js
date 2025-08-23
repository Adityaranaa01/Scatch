const jwt = require("jsonwebtoken")
const userModel = require('../models/user-model')

module.exports = async(req, res, next) => {
    if(!req.cookies.token) {
        req.flash("You are not logged in.")
        return res.redirect("/login")
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        let user = await userModel.findOne({email: decoded.email}).select("-password")

        req.user = user
        next()
    } catch(err) {
        req.flash("error", err.message)
        res.redirect("/login")
    }
}