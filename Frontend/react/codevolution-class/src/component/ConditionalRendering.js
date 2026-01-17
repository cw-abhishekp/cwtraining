import { Component } from "react";

class ConditionalRendering extends Component{

    constructor(){
        super()
        this.state={
            isGuest : false
        }
    }

    render(){

        // this is we are writint inside the jsx onlu condtion using the ternary operator and doing things as needed
        return (
            this.state.isGuest ? <h1>Welcome Guest</h1> : <h1>Welcome Known</h1>
        )
        // this is we have done using element variables
        // let message
        // if(this.state.isGuest){
        //     message = <h1>Welcome Guest</h1>
        // }
        // else message = <h1>Welcome Known</h1>
        // return (
        //     <>{message}</>
        // )
        // this is the if else condition with the help of that we are using conditons and then returning as per requited
        // if(this.state.isGuest==true){
        //     return (
        //         <>
        //         <h1>Welcome Guest</h1>
        //         </>
        //     )
        // }
        // else {
        //      return (
        //         <>
        //         <h1>Welcome Known</h1>
        //         </>
        //     )
        // }


        // return (
        //     <>
        //     <h1>Hii What is your name?</h1>
        //     </>
        // )
    }
}

export default ConditionalRendering