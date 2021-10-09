const cnicRegex = new RegExp('^[0-9]{5}-[0-9]{7}-[0-9]{1}$');
const emailRegex = new RegExp('^[a-z]{1}[a-zA-Z0-9]{0,28}@(gmail.com|hotmail.com|yahoo.com)$')
const mobileRegex = new RegExp('^(03)(0|1|2|3|4)[0-9]{1}[0-9]{7}$');
const tidRegex = new RegExp('^tid_[0-9]{20}$');
$(document).ready(function(){
    $('#transaction-form').on('submit',function (e){
    e.preventDefault();
    let account = $('#account').val();
    let bank = $('#bank_name').val();
    let cnic = $('#cnic').val();
    let email = $('#email').val();
    let amount = $('#amount').val();
    let mobile = $('#mobile').val();
    let check = checkInputs(account, bank, cnic, email, amount, mobile); 
    if(check){
        $.ajax({
        url: '/',
        type:'POST',
        data:  
        {
            account: account,
            bank: bank, 
            cnic: cnic, 
            email: email, 
            amount: amount, 
            mobile: mobile
        },
        success: function(res){
            error.innerHTML = res;
            error.style.color = 'green';
            }
        })
    
        }   
    })
});

$(document).ready(function(){
    $('#search-form').on('submit',function (e){
        e.preventDefault();
        let tid = $('#tid').val();
        let mobile = $('#mobile').val();
        if(!tidRegex.test(tid) || tid==""){
            error.innerHTML = "Please Enter a valid Transaction ID!";
            return false;
        }
        else if(!mobileRegex.test(mobile) || mobile == ""){
            error.innerHTML = "Please Enter a Valid Mobile Number!";
            return false;
        }   
        else{
            error.innerHTML = "";
            $.ajax({
                url: '/transactions',
                type:'POST',
                data:  
                {
                    tid: tid, 
                    mobile: mobile
                },
                success: function(res){
                    if(res=="Search Failed!"){
                        console.log(res);
                        error.innerHTML=res;
                    }
                    else{
                        displaySearchResult(res);

                    }
                    
                }
            })        
        }

    })
})

function checkInputs(account, bank, cnic, email, amount, mobile){
    if(account=="" || account.length==10 || account.length==14 || account.length==15 || account.length>16){
        error.innerHTML="Enter a Valid Account Number!";
        return false;
    }
    else if(bank==""){
        error.innerHTML="Please Select a Bank!";
        return false;
    }
    else if(!cnicRegex.test(cnic)){
        error.innerHTML="Please Enter a valid CNIC!";
        return false;
    }
    else if(amount=="" | amount<=0){
        error.innerHTML="Please Enter a Valid amount!";
        return false;
    }

    else if(!emailRegex.test(email)){
        error.innerHTML="Please Enter a Valid Email Address (gmail, yahoo, hotmail)!";
        return false;
    }
    
    else if(!mobileRegex.test(mobile)){
        error.innerHTML="Please Enter a Valid Mobile Number!";
        return false;
    }
    else{
        error.innerHTML="Transaction Successful!";
        return true;
    }

}

function displaySearchResult(res){
    $('#transaction_id').text(res.transactions[0].transactionID);
    $('#mbl').html(res.transactions[0].mobile);
    $('#account').html('Account: <b>'+res.transactions[0].accountNo+'</b');
    $('#bank').html('Bank: <b>'+res.transactions[0].bankID+'</b');
    $('#amount').html('Amount Transferred: <b>$'+parseFloat(parseFloat(res.transactions[0].amount)*res.exchangeRate).toFixed(3)+'</b');
    $('#cnic').html('CNIC: <b>'+res.transactions[0].CNIC+'</b');
    $('#email').html('Email: <b>'+res.transactions[0].email+'</b');
    $('#datetime').html('Date Time: <b>'+res.transactions[0].datetime+'</b');

}






