import { Component } from "react";

class Counter extends Component{
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
            <div>
            {this.props.render(this.state.count,this.incrementCounter)}
            </div>
        )
    }
}

export default Counter