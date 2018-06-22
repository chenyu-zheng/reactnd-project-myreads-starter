import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {
  state = {
    input: '',
    searchResults: [],
    error: null
  };

  searchBooks = query => {
    const queryStr = query.trim();
    // If there's no maches, the search API will return an object, which has an 'error' property, instead of an array.
    queryStr
      ? search(queryStr).then(books =>
          this.setState({
            searchResults: books.error ? [] : books,
            error: books.error || null
          })
        )
      : this.setState({ searchResults: [] });
  };

  handleChangeInput = event => {
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
              onChange={this.handleChangeInput}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.error ? (
            <p className="search-error-message">
              No maches. Please try some different terms.
            </p>
          ) : (
            <BooksGrid
              books={this.setBookStates()}
              onShelfDidChange={() => {
                this.searchBooks(this.state.input);
                this.props.onShelfDidChange();
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
