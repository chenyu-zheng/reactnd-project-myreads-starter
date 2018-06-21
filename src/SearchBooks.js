import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {
  state = {
    input: ''
  };

  componentWillMount = () => {
    console.log('SearchBooks will mount');
    this.props.onWillUnmout();
  };

  componentWillUnmount = () => {
    console.log('SearchBooks will unmount');
  };

  componentWillReceiveProps = () => {
    // console.log('will receive props');
  };

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  // TODO: show search results without submit
  handleSubmit = event => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    query &&
      this.props.onSubmit(query).then(() =>
        this.setState({
          input: query
        })
      );
  };

  setBookStates = () => {
    const { books, results } = this.props;
    return results.map(item => {
      const index = books.findIndex(b => b.id === item.id);
      if (index > -1) {
        item.shelf = books[index].shelf;
      }
      return item;
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="query"
                value={this.state.input}
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.setBookStates()}
            onChangeShelf={this.props.onChangeShelf}
            onShelfDidChange={() =>
              this.props.onShelfDidChange(this.state.input)
            }
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
