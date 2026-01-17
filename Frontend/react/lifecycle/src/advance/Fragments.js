import React, { Component} from "react";
import { Fragment } from "react";
class Fragments extends Component{
    render(){
        return(
            // so basically here fragment means without creating entry to the dom and grouping children
            <React.Fragment>
            <h1> What is your name ? </h1>
            </React.Fragment>
        )
    }
}

export default Fragments