const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { generateToken } = require('../utils/generatetoken')

module.exports.registerUser = async (req, res) => {
    try{
        let { email, fullname, password } = req.body
        let user = await userModel.findOne({email})
        if(user) {
            req.flash("error", "User already exists.")
            return res.redirect("/")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) res.send(err.message)
                else{
                    let createdUser = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })
                    let token = generateToken(createdUser)
                    res.status(200).cookie("token", token)
                    res.status(201).send("User created successfully")
                }
            })
        })
    }catch(err){
        console.log(err)
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        let { email, password } = req.body
        let user = await userModel.findOne({email})

        if(!user) {
            req.flash("error", "User does not exist.")
            return res.redirect("/")
        }

        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if(err) res.send(err.message)
            else if(isMatch){
                let token = generateToken(user)
                res.status(200).cookie("token", token)
                res.status(200).send("Login successful")
            }else{
                req.flash("error", "Invalid email or password.")
                return res.redirect("/")
            }
        })
    }catch(err){
        console.log(err)
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).redirect("/")
}