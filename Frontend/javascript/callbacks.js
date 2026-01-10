// the function that we pass into a another function is called a callback function.due to the callback we can do the async
// thing inside the js. Theya are called as callback function because they can be called later sometimes in a code we are giving another function 
// a responsibility to call a function.
// means the callback function does not wait for the anyoone they gives the ability to run a program in asyn way for example in a setTimeout it does not gonna wait for the long it just executes the another one so it gives ability

//using these webapi and settimeout we can achieve the asynchrounous operation means we can do all these means using those asynchrous possible
// this is a callback function and using that we are achieving asyn things settimeout is webapi
setTimeout(function(){
    console.log("timer");
}, 5000);

function a(){
    console.log("a");
}

function b(){
    console.log("b");
}
a();
b();

// this is a callback that are stores somewhere and then they automatically gives the ability get called when the button is clicked
// it will automatically comes inside the call stack and then does the work required.
// document.getElementById("btn").addEventListener("click",function xyz(){
//     console.log("button clicked")
// });


// here this is the eventlistener we can form the closure around these clicklistener and call the method so it will closure around the parent scope
// when we form closure then it gonna wrap that listener to the function so we can do that

//evenlistener is a heavy since it forms a closure around that and also since nothing is present in a call stack but we dont know it can be used where and when so we canot do that
// hence they are heavy so remove when we are not using them
function attachClosureToEventListener() {
    let a =0;
    document.getElementById("btn").addEventListener("click",function xyz(){
    console.log("button clicked", ++a)
});
}

attachClosureToEventListener();




