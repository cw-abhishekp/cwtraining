import { Component } from "react"
import UpdatedComponent from "./HOComponent"
class ButtonCounter extends Component{
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
            
            {/* <button onClick={this.props.incrementCounter}>{this.props.name} Click Button : {this.props.count}</button> */}
            <button onClick={this.props.incrementCounter}>Click Button : {this.props.count}</button>
            </>
        )
    }
}

// export default UpdatedComponent(ButtonCoounter)
export default ButtonCounter