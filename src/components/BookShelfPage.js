import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const BookShelfPage = ({allBooks, setAllBooks}) => {
  
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          allBooks={allBooks}
          setAllBooks={setAllBooks}
          shelfType="currentlyReading"
        />
        <BookShelf
          title="Want to Read"
          allBooks={allBooks}
          setAllBooks={setAllBooks}
          shelfType="wantToRead"
        />
        <BookShelf
          title="Read"
          allBooks={allBooks}
          setAllBooks={setAllBooks}
          shelfType="read"
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookShelfPage;
