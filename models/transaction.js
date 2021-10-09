const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },

    datetime : {
        type: Date,
        required: true
    },

    accountNo: {
        type: String,
        required: true
    },

    bankID: {
        type: String,
        required: true
    },

    CNIC: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    }





})

module.exports = mongoose.model('Transaction', transactionSchema);