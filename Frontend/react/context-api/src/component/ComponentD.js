import { Component } from "react"
import ComponentE from "./ComponentE"
import FunctionalComponentContext from "./FunctionalComponentContext"
class ComponentD extends Component{
    render(){
        return(
            <>
            <ComponentE/>
            <FunctionalComponentContext/> 
            </>
        )
    }
}
export default ComponentD