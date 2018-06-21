import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: []
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  clearSearchResults = () => {
    this.state.searchResults.length && this.setState({ searchResults: [] });
  };

  getAllBooks = () => {
    return BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  changeShelf = (id, shelf) => {
    return BooksAPI.update({ id }, shelf);
  };

  searchBooks = query => {
    return BooksAPI.search(query).then(books => {
      books.error
        ? this.setState({ searchResults: [] })
        : this.setState({ searchResults: books });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={this.changeShelf}
              onShelfDidChange={this.getAllBooks}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              results={this.state.searchResults}
              onSubmit={this.searchBooks}
              onChangeShelf={this.changeShelf}
              onShelfDidChange={query => {
                this.searchBooks(query);
                this.getAllBooks();
              }}
              onWillUnmout={this.clearSearchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
