import React, { Component } from "react";

class RefsDemo extends Component{

    constructor(props){
        super(props)
        this.inputRef = React.createRef()

        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount(){
        this.inputRef.current.focus()
        console.log(this.inputRef)
    }

    clickHandler(){
        console.log("Button clicked!")
        alert(this.inputRef.current.value)
    }
    render(){
        return(
            <>
            <input type = "text" ref ={this.inputRef} />
            <button onClick={this.clickHandler}>Click</button>
            </>
        )
    }
}


export default RefsDemo