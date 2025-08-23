const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
const indexRouter = require('./routes/indexRouter')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

app.set("view engine", "ejs")

app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000)