// this add event listener takes two argument one is the event function and then one true false that tells the phase either capturing or bubbling
// by defaualt it is a bubbling phase and values set to false here event goes from bottom to top and in case of capturing then it goes from top to bottom
// if event occur and capturing then parent and so on until bubble and then happen 
// we can stop the event propagration with the help of e.stopprapagation method so it will not propagate further and dtops there

document.querySelector("#grandparent")
.addEventListener("click",()=>{
    console.log("grandparent")
})

document.querySelector("#parent")
.addEventListener("click",()=>{
    console.log("parent")
},true)

document.querySelector("#child")
.addEventListener("click",()=>{
    console.log("child")
})