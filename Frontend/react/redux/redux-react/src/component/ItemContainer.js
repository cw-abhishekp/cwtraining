import {connect} from  'react-redux'

function ItemContainer(props){
    return(
        <>
        <h1> Items - {props.item}</h1>
        </>
    )
}

const mapStateToProps = (state,ownProps) =>{ 
    const itemstate = ownProps.cake ? state.cake.numOfCakes : state.icecream.numOfIceCream
    return {
        item : itemstate
    }
}



export default connect(mapStateToProps)(ItemContainer)