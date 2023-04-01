const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = 3001

//setting server
const http = require('http')
const server = http.createServer(app)

//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

//router
const userRoute = require('./Router/userRoute')
const productTypes = require('./Router/productTypesRoute')
const productRoute = require('./Router/productRoute')

// mongoose.connect("mongodb+srv://panhariththeng:panhariththeng@myproject.qjvahgk.mongodb.net/test").then(() =>{
//         server.listen(port,() => {
//             console.log("Database Connect.");
//         console.log("Server start: http://localhost:3001");
//     })
// })
// .catch((error) =>{
//     console.log("Database eror", error);
// })
mongoose.set('strictQuery', true)
mongoose
  .connect('mongodb+srv://admin:1234@cluster0.m1mxapf.mongodb.net/test')
  .then(() => {
    server.listen(port, () => {
      console.log('DB Connected')
      console.log('Seerver start: http://localhost:3001')
    })
  })
  .then((error) => {
    console.log(error)
  })

app.get('/', (req, res) => {
  res.status(200).json({
    work: true,
  })
})

//end point
app.use('/users', userRoute)
app.use('/product-types', productTypes)
app.use('/products', productRoute)
