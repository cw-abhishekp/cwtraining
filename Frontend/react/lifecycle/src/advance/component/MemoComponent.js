import React from "react"
function MemoComponent({name}){
    console.log("Memo Component Render")
    return(
        <>
        <h1>My name is : {name}</h1>
        </>
    )
}

export default React.memo(MemoComponent)