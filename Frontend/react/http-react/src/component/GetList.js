import { Component } from "react"
import axios from 'axios'

class GetList extends Component {
    constructor() {
        super()

        this.state={
            posts : []
        }
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{
            console.log(res)
            this.setState({
                posts : res.data
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    render() {
        const {posts} = this.state
        return (
            <div>
                List of Post

                {
                    posts.length ?
                    posts.map((post) => <div key = {post.id}>{post.title}</div>) : null
                }
            </div>
        )
    }
}

export default GetList