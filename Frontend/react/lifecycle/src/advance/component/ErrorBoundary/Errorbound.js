import { Component } from "react";


// this is we are setting a boundary and then we want to do show a fallback ui here 
class Errorbound extends Component{

    constructor(props){
        super(props)

        this.state ={
            hasError : false
        }
    }

    static getDerivedStateFromError(error){
        return{
            hasError : true
        }
    }

     static componentDidCatch(error,info){
        console.log(error)
        console.log(info)
    }
    
    render(){
        if(this.state.hasError){
            return(<h1>Error comes</h1>)
        }

        return this.props.children
    }
}

export default Errorbound