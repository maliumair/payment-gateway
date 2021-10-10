if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const transactionRouter = require('./routes/transactions')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL || 'Mongo Connection String Here', {useNewUrlParser : true})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', transactionRouter)

app.listen(process.env.PORT || 3000)



