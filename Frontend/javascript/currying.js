let multiply = function(x,y){
    console.log(x*y)
}

// here we are making copy of one function and then binding to multiply
multiplyAgain = multiply.bind(this);
multiplyAgain(5,3)


// here we are making copy and then predifining val =2 for x
multiplyByTwo = multiply.bind(this,2);
multiplyByTwo(8)
// here both set x = 2, y=3 here 
multiplyByTwo = multiply.bind(this,2,3);
multiplyByTwo()