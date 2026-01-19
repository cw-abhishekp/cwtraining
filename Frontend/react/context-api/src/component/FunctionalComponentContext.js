import { useContext } from "react";
import UserContext from "./UserContext";
import { ChannelContext } from "../App";

// this we are doing and using the useContext inorder to consume the values
function FunctionalComponentContext(){
    const user = useContext(UserContext)
    const channel = useContext(ChannelContext)


    return(
        <div>
            {user} by functional context :::: {channel}
        </div>
    )
}

export default FunctionalComponentContext