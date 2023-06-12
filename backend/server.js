const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const authRoute = require('./routes/auth')
const morgan = require('morgan')
const flash = require('connect-flash')
const { logout } = require('./controllers/auth')
const {isLoggedIn} = require('./middleware')
const indexPageDataFetch = require('./controllers/indexPageDataFetch')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))

app.use(session({
    name: 'session',
    secret: 'thisShouldBeAbetterSecret',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 * 1,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())

mongoose.connect('mongodb://localhost:27017/Ecommerce', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(()=> console.log("db connected"))
.catch((err)=> console.log(err))

app.use((req, res, next)=> {
    res.locals.currentUser = req.session.user
    res.locals.error = req.flash('error')
    next()
})

app.get("/", isLoggedIn, indexPageDataFetch)

app.use('/login', authRoute)

app.get('/logout', logout)


app.listen(3000, ()=> {
    console.log("listening on port 3000")
})