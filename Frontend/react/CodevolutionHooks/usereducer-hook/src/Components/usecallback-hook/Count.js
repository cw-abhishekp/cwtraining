import React from "react"

function Count({text,count}) {
    console.log(`Rendering ${text}`)
    return (
       <div>{text} - {count}</div>
    )
}

// this will pretent that only if the props and state changes then the method should call but here in case of
// the function it would not be able to do as always function gets newer hence callback hook is used if any of the dependencies changes then it will create a new function otherwise will memoise the same function
export default React.memo(Count)