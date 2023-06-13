const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const authRoute = require('./routes/auth')
const morgan = require('morgan')
const { logout } = require('./controllers/auth')
const {isLoggedIn} = require('./middleware')

const indexPageDataFetch = require('./controllers/indexPageDataFetch')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

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

mongoose.connect('mongodb://localhost:27017/Ecommerce', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(()=> console.log("db connected"))
.catch((err)=> console.log(err))

app.get("/", indexPageDataFetch)

app.use('/login', authRoute)

app.get('/logout', logout)


app.listen(8000, ()=> {
    console.log("listening on port 3000")
})