import { Component } from "react";
import MemoComponent from "./MemoComponent";

class ParentComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            name : "Abhishek"
        }
    }


    componentDidMount(){
        setInterval(()=>{
            this.setState({
                name : "Abhishek"
            })
        },2000)
    }
    render(){
        console.log("Parent Component Render")
        return (
            <>
            <MemoComponent name ={this.state.name}/>
            </>
        )
    }
}

export default ParentComponent    