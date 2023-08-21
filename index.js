const express=require('express')
const connection = require('./connection')
const cors=require('cors')
const ProductModel = require('./Models/ProductModel')
const ProductRouter = require('./Routes/ProductsRoute,js')


const app=express()
app.use(express.json())
app.use(cors())

app.use(ProductRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log('db connected to database successfully!')
    } catch (error) {
        console.log('db not connected to db')
    }
    console.log('server is running on port: 8080')
})



