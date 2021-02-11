import React from "react"

class App extends React.Component{
    constructor(){
        super()
        this.state= {
            topText:"",
            bottomText:"",
            memeImg:"https://i.imgflip.com/9ehk.jpg",
            memeCollection: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        const randImg = this.state.memeCollection[Math.floor(Math.random() * this.state.memeCollection.length)].url
        this.setState({memeImg : randImg})

    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
        console.log(this.state.memeCollection)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => this.setState({memeCollection : data.data.memes}))
    }
     render(){
         return(
             <div>
                 <form onSubmit={this.handleSubmit}>
                     <input name="topText" onChange={this.handleChange} value={this.state.topText} placeholder="Enter the top text" />
                     <input name="bottomText" onChange={this.handleChange} value={this.state.bottomText} placeholder="Enter the bottom text" />
                     <button>Get Meme</button>
                 </form>
                <div className="wrapper">
                    <div>
                        <img src={this.state.memeImg} alt="meme" className="meme-image"/>
                    </div>
                    <div className="meme-container">
                        <h1 className="top-text"> {this.state.topText}</h1>
                        <h1 className="bottom-text">{this.state.bottomText}</h1>
                    </div>
                </div>
             </div>
         )
     }
}

export default App