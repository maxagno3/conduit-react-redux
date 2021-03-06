import React, { Component } from "react";
import { fetchArticle } from "../store/actions";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ARTICLE, ALL_ARTICLES } from "../store/types";

class Articles extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchArticle(
        "https://conduit.productionready.io/api/articles?limit=20&offset=0"
      )
    );
  }

  handleLike = () => {
    let { slug, favorited } = this.props.article;
    let url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    let method = favorited ? "DELETE" : "POST";
    fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        this.props.dispatch({ type: ARTICLE, payload: article });
        return this.props.history.push(`/articles/${slug}`);
      });
  };

  handleFilter = (activeTab) => {
    let myFeed = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=0`;
    let globalFeed = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;
    switch (activeTab) {
      case "myFeed":
        return fetch(myFeed, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Token ${localStorage.authToken}`,
          },
        })
          .then((res) => res.json())
          .then(({ articles }) =>
            this.props.dispatch({ type: ALL_ARTICLES, payload: articles })
          );
      case "globalFeed":
        return fetch(globalFeed, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Token ${localStorage.authToken}`,
          },
        })
          .then((res) => res.json())
          .then(({ articles }) =>
            this.props.dispatch({ type: ALL_ARTICLES, payload: articles })
          );
      default:
        return activeTab;
    }
  };

  render() {
    const { articles } = this.props;

    return (
      <>
        <div
          className="mobile-app-toggle articles-container"
          data-mobile-app-toggle
        >
          <button
            className="button is-active"
            onClick={() => this.handleFilter("myFeed")}
          >
            My Feed
          </button>
          <button
            className="button"
            onClick={() => this.handleFilter("globalFeed")}
          >
            Global Feed
          </button>
        </div>
        <div className="flex">
          {articles.map((article) => {
            return (
              <div className="articles-container flex-basis" key={uuid()}>
                <div className="card news-card">
                  <img
                    src={`https://source.unsplash.com/collection/{${Math.floor(
                      Math.random() * 100
                    )}/1600x900`}
                    alt={article.author.username}
                  />
                  <div className="card-section">
                    <div className="news-card-date">
                      {article.updatedAt.split("T")[0]}
                    </div>
                    <article className="news-card-article">
                      <h4 className="news-card-title">
                        <Link to={`articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <p className="news-card-description">
                        {article.description}
                      </p>
                    </article>
                    {article.favorited ? (
                      <button
                        className="button button-like like-btn"
                        onClick={this.handleLike}
                      >
                        <i className="fa fa-heart"></i>
                        <span> UnLike</span>
                      </button>
                    ) : (
                      <button
                        className="button button-like"
                        onClick={this.handleLike}
                      >
                        <i className="fa fa-heart"></i>
                        <span> Like</span>
                      </button>
                    )}

                    <div className="news-card-author">
                      <div className="news-card-author-image">
                        <img
                          src={article.author.image}
                          className="article-image"
                          alt="user"
                        />
                      </div>
                      <div className="news-card-author-name">
                        By{" "}
                        <Link to={`/profiles/${article.author.username}`}>
                          {article.author.username}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(Articles);
