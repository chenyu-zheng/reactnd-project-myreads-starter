import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {
  state = {
    input: '',
    searchResults: []
  };

  searchBooks = query => {
    const queryStr = query.trim();
    queryStr &&
      search(queryStr).then(books =>
        this.setState({
          searchResults: books.error ? [] : books
        })
      );
  };

  handleInputChange = event => {
    this.setState({
      input: event.target.value
    });
    this.searchBooks(event.target.value);
  };

  setBookStates = () => {
    return this.state.searchResults.map(book => {
      book.shelf = this.props.shelfMap.get(book.id) || null;
      return book;
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
            <input
              type="text"
              name="query"
              value={this.state.input}
              placeholder="Search by title or author"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.setBookStates()}
            onShelfDidChange={() => {
              this.searchBooks(this.state.input);
              this.props.onShelfDidChange();
            }}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
