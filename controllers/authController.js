const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { generateToken } = require('../utils/generatetoken')

module.exports.registerUser = async (req, res) => {
    try{
        let { email, fullname, password } = req.body
        let user = await userModel.findOne({email})
        if(user) return res.status(401).send("User already exists.")

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
        if(!user) return res.status(401).send("User not found.")
        bcrypt.compare(password, user.password, async (err, isMatch) => {
            if(err) res.send(err.message)
            else if(isMatch){
                let token = generateToken(user)
                res.status(200).cookie("token", token)
                res.status(200).send("Login successful")
            }else{
                res.status(401).send("Invalid credentials.")
            }
        })
    }catch(err){
        console.log(err)
    }
}