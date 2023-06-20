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

const morgan = require('morgan')
const { logout } = require('./controllers/auth')
// const {isLoggedIn} = require('./middleware')
const Review = require('./models/review')
const Product = require('./models/product')
const {getIndexData} = require('./controllers/indexPageDataFetch')
const { getCustomers } = require('./controllers/customers')
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
app.get("/", getIndexData)
app.get('/customers', getCustomers)

app.use('/login', authRoute)
app.use('/products', productRoute)
app.use('/reviews', ReviewRoute)
app.use('/category', categoryRoute)
app.use('/brand', brandRoute)
app.post('/test', (req, res) => {
    console.log(req.body)
})
app.get('/addReview', async (req, res) => {
    const rev = new Review({
        title:"Excelente",
        body: "lorem lorem lorem lorem lorem lorem lorem lorem lorem ipsum",
        rating: 5,
        author: "648669b54064b12d378d19b9",
        product: "648b36eda6e8114e11204343"
    })
    const product = await Product.findById('648b36eda6e8114e11204343')
    product.reviews.push(rev)
    await product.save()
    await rev.save()
    res.send(rev)
})
app.use('/addProduct', async (req, res) => {
    const product = new Product({
        title: "xbox 360",
        description: "new xbox 360 with 10 games gift",
        price: 250,
        discount: 25,
        category: "6485d4b114c750caff2b9530",
        brand: "6485d5350c89919a49396f30"

    })
    await product.save()
    res.send(product)
})
app.get('/logout', logout)


app.listen(8000, ()=> {
    console.log("listening on port 3000")
})