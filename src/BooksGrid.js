import React, { Component } from 'react';
import { update } from './BooksAPI';

class BooksGrid extends Component {
  handleChangeShelf = event => {
    const t = event.target;
    update({ id: t.dataset.id }, t.value).then(this.props.onShelfDidChange);
  };

  camelToKebab = str => {
    return str.replace(/([A-Z])/g, letter => `-${letter.toLowerCase()}`);
  };

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  // some books don't have an image
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: book.imageLinks
                      ? `url(${book.imageLinks.thumbnail})`
                      : 'none'
                  }}
                />
                <div
                  className={
                    // gives a shelf changer an icon according to the book's shelf
                    'book-shelf-changer' +
                    (book.shelf ? ` ${this.camelToKebab(book.shelf)}` : '')
                  }
                >
                  <select
                    value={book.shelf ? book.shelf : 'none'}
                    data-id={book.id}
                    onChange={this.handleChangeShelf}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {/* a book could have multiple or no authors */}
              {book.authors && (
                <ol className="book-authors">
                  {book.authors.map(author => <li key={author}>{author}</li>)}
                </ol>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;
