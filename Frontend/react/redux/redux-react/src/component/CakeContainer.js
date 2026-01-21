import BuyCake from "../redux/cakes/CakeActions";
import {connect} from  'react-redux'

function CakeContainer(props){
    return(
        <>
        <h1> Number of Cakes - {props.numOfCakes}</h1>
        <button onClick={props.buycake}>Button</button>
        </>
    )
}

const mapStateToProps = state =>({ 
    numOfCakes : state.cake.numOfCakes
})

const mapDispatchToProps = dispatch =>({
    buycake : () => dispatch(BuyCake())
})

export default connect(mapStateToProps,mapDispatchToProps)(CakeContainer)