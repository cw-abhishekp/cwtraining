import { Component } from "react"
import UpdatedComponent from "./HOComponent"
class HoverCounter extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         count : 0
    //     }

    //     this.incrementCounter = this.incrementCounter.bind(this)
    // }


    // incrementCounter() {
    //     this.setState((prevstate)=>{
    //         return {count : prevstate.count + 1}
    //     })
    // }

    render(){
        return(
            <>
            <h1 onMouseOver={this.props.incrementCounter}>Mouse Hover : {this.props.count}</h1>
            </>
        )
    }
}

// export default UpdatedComponent(HoverCounter)
export default HoverCounter