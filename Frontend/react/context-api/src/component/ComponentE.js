import { Component } from "react"
import ComponentF from "./ComponentF"
import UserContext from "./UserContext"
class ComponentE extends Component{
    static contextType = UserContext
    render(){
        return(
            <>
            <h1>
            value using context-type : {this.context}
            <ComponentF/>
            </h1>
            </>
        )
    }
}
// we are using context class in order to access the value directly using contexttype and then access using this.context
// ComponentE.contextType = UserContext
export default ComponentE