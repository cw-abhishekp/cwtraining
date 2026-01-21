import BuyIcecream from "../redux/iceCream/icecreamActions";
import {connect} from  'react-redux'

function IcecreamContainer(props){
    return(
        <>
        <h1> Number of Icecream - {props.numOfIcecream}</h1>
        <button onClick={props.buyicecream}>Button</button>
        </>
    )
}

const mapStateToProps = state =>({ 
  numOfIcecream: state.icecream.numOfIceCream
})

const mapDispatchToProps = dispatch =>({
    buyicecream : () => dispatch(BuyIcecream())
})

export default connect(mapStateToProps,mapDispatchToProps)(IcecreamContainer)