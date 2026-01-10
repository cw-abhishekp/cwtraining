var x = 10;
a();
b();

console.log(x)

function a(){
    var x = 100;
    console.log(x)
}

function b(){
    var x = 1000;
    console.log(x)
}
document.getElementById("btn").addEventListener("click", () => {
  alert("JavaScript is working!");
});



// setTimeOut and Closure here when we use the var then it gonna give me 6 times each since it stores
// the references so they all the value  6 since it has the global level scope but when i use the block level scope of 
// let then it gonna give me all the values from 1 to 5 in a closure since they all form different closure
for(let i =1;i<=5;i++){
  setTimeout(function(){
    console.log(i)
  },i*1000);
}


// now if gonna use the closure function with the var means not let so we have to use that since every function has the its own scope 
// so create the function level scope and then does the thing like that

for(let i =1;i<=5;i++){
  function close(x){
    setTimeout(function(){
    console.log(x)
  },i*1000);
  }
  close(i);
}

console.log("This is printing first in setTimeOut first and then all.")