import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {TiSocialTwitter} from "react-icons/ti";
import {FaRandom, FaQuoteLeft} from "react-icons/fa";
import "./index.css";

// import font awesome

const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  state = {
    quotes: [{"quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"}],
    index: 0
  }
  componentDidMount() {
    fetch(API).then(res => res.json())
      .then(res => this.setState({
          quotes: res.quotes
    }, this.getRandomIndex))
    
  }
  getRandomIndex() {
    const { quotes } = this.state;
    if (quotes.length > 0 ) {
      const index = Math.floor(Math.random() * quotes.length)
      this.setState({
        index
      })
    }
  }
  render() {
    const {quotes, index} = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`;
    
    return (
      <div className="row d-flex justify-content-center vh-100 align-items-center">
        
        <div className="col-6 p-4 rounded" id="quote-box">
          <FaQuoteLeft className="text-primary"/>
          {quote && 
            (<div className="mb-4">
              
              <p id="text">{quote.quote}</p>
              
              <cite id="author" className="d-block text-right">
                - {quote.author}
              </cite>
              
            </div>)}
          
          <div className="d-flex justify-content-between">
            
            <a href={tweetURL} target="_blanck" id="tweet-quote" 
                className="btn btn-sm btn-primary">
              <TiSocialTwitter/> twitter
            </a>
            
            <button id="new-quote" 
            className="btn btn-sm btn-primary" 
            onClick={this.getRandomIndex.bind(this)}>
              <FaRandom/> Get Quote
            </button>
            
          </div>
        </div>
      </div>
    )
  }
}

export default App;