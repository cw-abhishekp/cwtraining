import { Component } from "react";

class Counter extends Component{
    constructor(){
        super()
        this.state ={
            count : 0
        }
    }

    incrementCounter(){
        // here another paramter is callback value that anything after function call then we do all these
        this.setState(
            {
            count : this.state.count+1
        },
        ()=>{
            console.log(this.state.count, " This is after the callback")
        })

        // here what happens function get called and it happens in a synchrounous way hence gettting value =0 because setState is a asyn operation
        console.log(this.state.count)
    }
    // second object is props object here if props object dependency
    incrementFiveTimesCounter(){
         // here another paramter is callback value that anything after function call then we do all these
        this.setState((prevState,props)=> ({
            count : prevState.count +1
        }))

        // here what happens function get called and it happens in a synchrounous way hence gettting value =0 because setState is a asyn operation
        console.log(this.state.count)
    }

    incrementFive(){
        this.incrementFiveTimesCounter()
        this.incrementFiveTimesCounter()
        this.incrementFiveTimesCounter()
        this.incrementFiveTimesCounter()
        this.incrementFiveTimesCounter()
    }

    render(){
        return (
            <>
            <h1>Counter - {this.state.count}</h1>
            <hr></hr>
            <button onClick={()=>this.incrementFive()}>Update the counter</button>
            </>
        );
    }
}

export default Counter