import MountingB from "./MountingB";

const { Component } = require("react");

class MountingA extends Component{

    constructor(props){
        super(props);

       this.state={
            isGuest : false
    }

        console.log("Constructor A called")
    }

    static getDerivedStateFromProps(state,props){
        console.log("Static method  A called")
        return null
    }

    componentDidMount(){
        console.log("Mount A called")
    }


    render(){
        console.log("Render A method called")
        return (
            <>
            <div>
                <div>Mounting A</div>
                <MountingB/>
            </div>
            </>
        )
    } 
}

export default MountingA