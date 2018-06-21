import React, { Component } from 'react';
import { update } from './BooksAPI';

class BooksGrid extends Component {
  handleChangeShelf = event => {
    const t = event.target;
    update({ id: t.dataset.id }, t.value).then(this.props.onShelfDidChange);
  };

  render() {
    const { books } = this.props;
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      book.imageLinks ? book.imageLinks.thumbnail : 'none'
                    })`
                  }}
                />
                <div className="book-shelf-changer">
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
