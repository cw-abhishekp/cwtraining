import { useState } from "react";
import BuyCake from "../redux/cakes/CakeActions";
import {connect} from  'react-redux'

function NewCakeContainer(props){
    const [number,setNumber] = useState(1)

    return(
        <>
        <h1> Number of Cakes - {props.numOfCakes}</h1>
        <input type="text" value={number} onChange={e => setNumber(e.target.value)}/>
        <button onClick={()=> props.buycake(number)}>Button {number}</button>
        </>
    )
}

const mapStateToProps = state =>({ 
    numOfCakes : state.cake.numOfCakes
})

const mapDispatchToProps = dispatch =>({
    buycake : (number) => dispatch(BuyCake(number))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewCakeContainer)