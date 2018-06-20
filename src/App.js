import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: []
  };

  shelves = [
    {
      title: 'Currently Reading',
      type: 'currentlyReading'
    },
    {
      title: 'Want to Read',
      type: 'wantToRead'
    },
    {
      title: 'Read',
      type: 'read'
    }
  ];

  componentDidMount = () => {
    this.getAllBooks();
  };

  componentDidUpdate = (_, prevState) => {
    prevState.searchResults.length && this.setState({ searchResults: [] });
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
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <ol>
                  {this.shelves.map(shelf => (
                    <li className="bookshelf" key={shelf.type}>
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                        <ListBooks
                          books={this.state.books.filter(
                            book => book.shelf === shelf.type
                          )}
                          onChangeShelf={this.changeShelf}
                          onShelfDidChange={this.getAllBooks}
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
