import React from "react";
import Book from "./Book";

const BookShelf = ({ title, allBooks, setAllBooks, shelfType }) => {
  const books = allBooks.filter((book) => book.shelf === shelfType);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  book={book}
                  allBooks={allBooks}
                  setAllBooks={setAllBooks}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
