

const p1 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve("p1 success.")
    },1000)
})

const p2 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve("p2 success.")
    },2000)
})


const p3 = new Promise(function(resolve,reject){
    // setTimeout(()=>{
    //     resolve("p3 success.")
    // },3000)
    
    setTimeout(()=>console.log())
})

// on a successful promise it will give you the result of all otherwise will throw an error immediately
Promise.all([p1,p2,p3]).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});



Promise.all([p1,p2,p3]).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});


// using prrototype it gets the aceess to the other promises like this property has acess to other fnction and properties
