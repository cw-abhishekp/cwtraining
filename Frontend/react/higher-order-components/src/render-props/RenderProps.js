import { Component } from "react";

class RenderProps extends Component{
    render(){
        return(
           <div>
            {this.props.render(true)}
           </div>
        )
    }
}

export default RenderProps