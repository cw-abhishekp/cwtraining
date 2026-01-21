import {useSelector, useDispatch} from  'react-redux'
import BuyCake from '../redux/cakes/CakeActions'
function HooksCakeContainer(){
    // this is a way we are connecting to a store of each one means instead matchStatetoprops 
    const numOfCakes = useSelector(state => state.numOfCakes)
    const dispatch = useDispatch()
    return(
        <>
        <h1> Number of Cakes - {numOfCakes}</h1>
        <button onClick={()=>dispatch(BuyCake())}>Button</button>
        </>
    )
}
export default HooksCakeContainer