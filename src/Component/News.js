import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import { PropTypes } from 'react';

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:6,
    category: 'general',
  }
  
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // }

  constructor() {
    super();
    this.state = {
      // articles: [this.articles],
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=be7de28759ba4cf89d808b4b5097ee12&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    })
  }

  handlePrevClick = async () => {
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be7de28759ba4cf89d808b4b5097ee12&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async () => {
    console.log("next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=be7de28759ba4cf89d808b4b5097ee12&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  render() {
    return (<>
      <div className="container my-3">
        <div className="text-center" style={{margin: '20px 0'}}>
          <h2>URnews - Top Headlines</h2>
        </div>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
      </div>

      <div className="container d-flex justify-content-between my-4">
        <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>	&#8592; Previous</button>
        <button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next 	&#8594;</button>
      </div>
    </>
    )
  }
}

export default News
