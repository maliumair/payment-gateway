const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const axios = require('axios');
var exchangeRateToday;
//All Transactions
router.get('/transactions/:page?', async(req, res, next) => {
    var perPage = 1
    var page = req.params.page || 1
 
    Transaction
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, transactions) {
            Transaction.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('transactions/index', {
                    transaction: transactions,
                    exchangeRate: exchangeRateToday,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    
})

//Create Transaction
router.get('/', (req, res) => {
    res.render('transactions/new', {transaction: new Transaction()})
})

//Add Transaction
router.post('/', async(req, res)=>{
    let transaction_id = "tid_"+Date.now()+req.body.cnic.split('-')[1];
    let datetime = new Date();
    const transaction = new Transaction({
        transactionID : transaction_id,
        datetime : datetime,
        accountNo : req.body.account,
        bankID : req.body.bank,
        CNIC : req.body.cnic,
        email : req.body.email,
        mobile : req.body.mobile,
        amount: req.body.amount
    })

    try{
        const newTransaction = await transaction.save()
        res.send("Transaction Successful!")
    }
    catch (err){
        res.send("Error saving! "+err )
    }
})

//Search Transaction

router.post('/transactions', async (req, res)=>{
    try{
        const transactions = await Transaction.find({transactionID: req.body.tid, mobile: req.body.mobile})
        res.send({transactions: transactions, exchangeRate: exchangeRateToday})
    } 
    catch{
        res.send('Search Failed!');
    }
})


const exchangeRateCall =async() =>{
    var url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=PKR&to_currency=USD&apikey=Your API KEY';
    await axios.get(url)
    .then(function(exchangeRate){
        exchangeRateToday = exchangeRate.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
    })
}

exchangeRateCall();


module.exports = router;
