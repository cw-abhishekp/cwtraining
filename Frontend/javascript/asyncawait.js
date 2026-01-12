// // this await function will return the promise always if direct then wrap around data otherwise created promise
// async function getData(){
//     // return "Hi";
//     return new Promise(function(resolve,reject){
//         resolve("Resolved promise.")
//     })
// }
// const dataPromise = getData()
// dataPromise.then((data) => console.log(data))


// // you always write await infront of promise and then that will be resolved
// const p = new Promise(function(resolve,reject){
//         resolve("Using the await to handle the promise.")
// })

// async function handleAwaitPromise(){
//         const val = await p;
//         console.log(val);}

// handleAwaitPromise()


// const p1 = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve("Difference between await promises and await handling.")
//     },10000)
// })

// // here it goes to the next line and after 10 sec it goes to the promise
// function p1Resolve(){
//     p1.then((res) => console.log(res))
//     console.log("Lines get executed")
// }

// p1Resolve();


// // here it will wait until the promise does not get resolved and when resolve it goes to the next line
// async function p1ResolveUsingAwait() {
//     const val = await p1;  
//     console.log(val)
//     console.log("Lines not get executed and wait for the promised to be resolved")
// }

// // so here you understand here for that particular function the stack will comes and out and then again goes when promises resolved
// console.log("hii final stack")
// p1ResolveUsingAwait()


// Real world example of async await
const GITHUB_API = "https://api.github.com/users/akshaymarch7"

async function realWorldAwaitHandlingPromise() {
    try{const data = await fetch(GITHUB_API);
    const jsonValue = await data.json();
    console.log(jsonValue)
}
    catch(err){
        console.log("Error comes and handle by normal await handling promises.")
    }
    
}
realWorldAwaitHandlingPromise()
