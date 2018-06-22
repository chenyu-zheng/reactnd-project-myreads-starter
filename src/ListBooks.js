import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class ListBooks extends Component {
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

  render() {
    return (
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
                  <BooksGrid
                    books={this.props.books.filter(
                      book => book.shelf === shelf.type
                    )}
                    onShelfDidChange={this.props.onShelfDidChange}
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
    );
  }
}

export default ListBooks;
