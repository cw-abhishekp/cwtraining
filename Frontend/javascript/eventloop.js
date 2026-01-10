/* document.getElementById("btn").addEventListener("click",function xyz(){
    console.log("eventlistener event loop")
});

fetch("https://api.netflix.com/").then(function cbffetch(){
    console.log("fetch api call back present in microtask queue.")
});*/



setTimeout(function(){
    console.log("timer eventloop");
},5000);


// so here we are doing that settime is 5 sec but because of this it gonna wait for 10 sec since the gce is still in callstack it does not finish his execution then after the above callback willm get the opportunity

let startTime = new Date().getTime()
let endTime = startTime

while(endTime<startTime+10000){
    endTime  = new Date().getTime()
}



// here x is the callback function and y is the higher order function
function x(){

}

function y(x){
    x()
}
