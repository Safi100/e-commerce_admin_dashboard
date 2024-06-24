if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const productRoute = require('./routes/products')
const ReviewRoute = require('./routes/review') 
const categoryRoute = require('./routes/category')
const brandRoute = require('./routes/brand')
const advertisementRoute = require('./routes/advertisement')
const orderRoute = require('./routes/order')
const customerRoute = require('./routes/customers')

const { logout } = require('./controllers/auth')
const { authenticateJWT } = require('./middleware');
const {getIndexData} = require('./controllers/indexPageDataFetch')
const { getCustomers } = require('./controllers/customers')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: [process.env.BASE_URL],
    credentials: true
}));
app.use(cookieParser())
app.use(express.static('uploads'))

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(()=> console.log("db connected"))
.catch((err)=> console.log(err))

app.get('/', authenticateJWT, getIndexData)
app.use('/customers', authenticateJWT, customerRoute)
app.use('/auth', authRoute)
app.use('/products', authenticateJWT, productRoute)
app.use('/reviews', authenticateJWT, ReviewRoute)
app.use('/category', authenticateJWT, categoryRoute)
app.use('/brand', authenticateJWT, brandRoute)
app.use('/advertisement', authenticateJWT, advertisementRoute)
app.use('/orders', authenticateJWT, orderRoute)
app.get('/logout', logout)

app.listen(8000, ()=> {
    console.log("listening on port 3000")
})