/*So main difference between the callback function and promises is that in callback we pass the callbackfunction to another function and gives it control to call it anywhere and incase of promises we attach the callback function to the these so whenever data is filled as soon as we get the data then call the function so it is a main difference. So it might possible that these createorder api may 
call it twice thrice and may not call there are so many possibilities all these are handled by the promises that when to call the function all these  
*/
// createOrder(cart,function proceedToPayment(orderId){
//     proceedToPayment(orderId)
// });

// promise = createOrder(cart)

// promise.then(function proceedToPayment(orderId){
//     proceedToPayment(orderId)
// })

// here we are doing callback chaining where one function is calling another and then another and so on
// promise.then(function (orderId){
//      return proceedToPayment(orderId)
// }).then(function(paymentInfo){
//     return showOrderSummary(paymentInfo)
// }).then(function (paymentInfo){
//     return updateWalletBalance(paymentInfo)
// })


// this the another promise chaining 
// createOrder(cart).then((orderId) => proceedToPayment(orderId))
// .then((paymentInfo) => showOrderSummary(paymentInfo))
// .then((paymentInfo) => updateWalletBalance(paymentInfo))


const GITHUB_API = "https://api.github.com/users/akshaymarch7"
const user = fetch(GITHUB_API);

console.log(user);

user.then(function(data){
    console.log(data)
})

// here we are creating the promises and we are correctly resolving the promises and also rejecitng the promises/

cart = ['1','2','3'];
function validateCard() {return true}
const promise = createOrder(cart);

promise.then(function(orderId){
    console.log(orderId)
    return orderId;
}).then(function(orderId){
    return proceedToPayment(orderId);
})
.then(function(paymentInfo){
    console.log(paymentInfo)
}).
catch(function(err){
    console.log(err)
})

function createOrder(cart){
    const pr = new Promise(function(resolve,reject){
        if(!validateCard(cart)){
            // here we are rejecting the promises with the error 
            const err = new Error("Cart is not valid")
            reject(err)
        }
        else {
            // here we are resolving and sending the data in resolve which is dat ahere is resolve 
            const orderId = "12345"
            resolve(orderId)
        }
    })
    return  pr
}

function proceedToPayment(orderId){
    return new Promise(function(resolve,reject){
        return resolve("Payment was successful")
    })
    }


