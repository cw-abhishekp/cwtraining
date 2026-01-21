import { BUY_CAKE } from "./CakeTypes";

const BuyCake = (number=1)=>{
    return {
        type : BUY_CAKE,
        payload : number
    }
}

export default BuyCake