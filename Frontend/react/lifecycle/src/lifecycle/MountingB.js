const { Component } = require("react");

class MountingB extends Component{

    constructor(props){
        super(props);

       this.state={
            isGuest : false
    }

        console.log("Constructor B called")
    }

    static getDerivedStateFromProps(state,props){
        console.log("Static method  B called")
        return null
    }

    componentDidMount(){
        console.log("Mount B called")
    }


    render(){
        console.log("Render B method called")
        return (
            <>
            <h1>Hello</h1>
            </>
        )
    } 
}

export default MountingB