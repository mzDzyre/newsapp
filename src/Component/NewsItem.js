import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props
    return (
      <div className="card">
        <img src={imageUrl?imageUrl:"https://us.123rf.com/450wm/glopphy/glopphy1712/glopphy171200103/92096551-question-mark-thought-man-undecided.jpg?ver=6"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem