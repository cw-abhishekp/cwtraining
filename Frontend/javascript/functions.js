// function statement : this is the normal function  (function declaration)

// Main difference between the function statement and function expression is the hoisting as when in a function statement memory assigns then it assigns the whole function but during expression then the variable assigned with the value undefined but when does so it gives a typeerror as the var cannot be converted to the function but if baad me call then it gonna work since it assigs the function only then call
// a();
// b();
function a(){
    console.log("a called")
}

// function expression : here we are assigning to some particular variable
var b = function(){
    console.log("b called")
}

// here it gonna work ok 
 a();
 b();

// Anonymous function :- the function without a name is the anonymous function. They are used generally whenever we need direct values.
// function (){

// }


// named function expression :- function expression with the name 
// here if we gonna call b() then will not give error but when xyz() then it gives reference error since it in a local scope only not in a global scope so we can access inside the b not inside the 
var d = function xyz(){
    // we can call here function xyz since it is in this scope not in a global scope
    console.log("d called")
}
// Parameters and Arguments : so the params are that we define in a func declaration and then arguments are thoose that we pass during the function call

// First class function : the ability to use the function as the values means we can pass the function inside the function means we can pass anonymous function like everything means we can pass function inside function
// we can pass named function anonymous function and then return a anonymous function and and also the named function i can do all these 
// so the ability to all these is called a first class function it is same as first class citizen

function c(param1){
    console.log(param1);
    // return function(){

    // }
    return function d(){

    }
}
c(function(){
})


// arrow function :- it is termed as the es6 comes here in 2025






