import { Component } from "react";

const UpdatedComponent = (OriginalComponent) =>{
    class NewComponent extends Component{
         constructor(props){
        super(props)
        this.state = {
            count : 0
        }

        this.incrementCounter = this.incrementCounter.bind(this)
    }


    incrementCounter() {
        this.setState((prevstate)=>{
            return {count : prevstate.count + 1}
        })
    }


        render(){
            return(
                <OriginalComponent incrementCounter = {this.incrementCounter} count = {this.state.count}
                {... this.props}/>
            )
        }
    }
     return NewComponent
}

export default UpdatedComponent