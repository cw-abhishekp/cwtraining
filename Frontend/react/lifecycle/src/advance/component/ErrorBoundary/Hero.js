import React from "react"

function Hero({name}){
    if(name==="Joker") throw new Error("Not a hero!")
    return (
        <>
        <h1>Hero name is : {name}</h1>
        </>
    )
}

export default Hero