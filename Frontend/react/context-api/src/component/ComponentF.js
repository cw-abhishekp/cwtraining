import { Component } from "react"
import { UserConsumer } from "./UserContext"
import { ChannelContext } from "../App"
class ComponentF extends Component{
    render(){
        return(
            // here we are using that value that has been provided byuSERPROVIDE context and doing it 
            // <UserConsumer>
            //     {
            //         (username) =>{
            //             return <div>Hello {username}</div>
            //         }
            //     }
            // </UserConsumer>


            <UserConsumer>
                {
                    user =>{
                        return(
                            <ChannelContext.Consumer>
                                {
                                    channel =>{
                                        return <div>Hello {user} from {channel}</div>
                                    }
                                }
                            </ChannelContext.Consumer>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default ComponentF