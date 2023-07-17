if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

const authRoute = require('./routes/auth')
const productRoute = require('./routes/products')
const ReviewRoute = require('./routes/review') 
const categoryRoute = require('./routes/category')
const brandRoute = require('./routes/brand')
const advertisementRoute = require('./routes/advertisement')

const morgan = require('morgan')
const { logout } = require('./controllers/auth')
// const {isLoggedIn} = require('./middleware')
const Review = require('./models/review')
const Product = require('./models/product')
const {getIndexData} = require('./controllers/indexPageDataFetch')
const { getCustomers } = require('./controllers/customers')
const product = require('./models/product')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('uploads'))

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
app.use((req, res, next) => {
    console.log(req.session) ;
    next()
})

app.get('/', getIndexData)
app.get('/customers', getCustomers)

app.use('/login', authRoute)
app.use('/products', productRoute)
app.use('/reviews', ReviewRoute)
app.use('/category', categoryRoute)
app.use('/brand', brandRoute)
app.use('/advertisement', advertisementRoute)

app.get('/logout', logout)

app.listen(8000, ()=> {
    console.log("listening on port 3000")
})