import { Component } from "react"
import axios from 'axios'

class PostList extends Component {    
    render() {
        return (
            <div>
                <form>
                    <div>
                    <input type="text" id = "userId"></input>
                    </div>
                    <div>
                    <input type="text" id = "title"></input>
                    </div>
                    <div>
                    <input type="text" id = "body"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostList