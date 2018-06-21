import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  getAllBooks = () => {
    return BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  getShelfMap = () => {
    return new Map(this.state.books.map(book => [book.id, book.shelf]));
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
              onShelfDidChange={this.getAllBooks}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              shelfMap={this.getShelfMap()}
              onShelfDidChange={this.getAllBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
