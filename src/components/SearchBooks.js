import React, { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchBooks = ({ allBooks, setAllBooks }) => {
    const [queredBooks, setQueredBooks] = useState([]);
    const [searchQueryValue, setSearchQueryValue] = useState("");
    const searchQueryInputHandler = (e) => {
        setSearchQueryValue(e.target.value);
    };

    useEffect(() => {
        let isMounted = true;

        if (searchQueryValue.length !== 0 && searchQueryValue !== " ") {
            BooksAPI.search(searchQueryValue, 20)
                .then((data) => {
                    if (isMounted && !data.error) setQueredBooks([...data]);
                })
                .catch((err) => {
                    console.log("error triggered in search");
                    console.log(err);
                    if (isMounted) setQueredBooks([]);
                });
        } else {
            if (isMounted) setQueredBooks([]);
        }

        return () => {
            isMounted = false;
        };
    }, [searchQueryValue]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchQueryValue}
                        onChange={searchQueryInputHandler}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {queredBooks.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    allBooks={allBooks}
                                    queredBooks={queredBooks}
                                    setAllBooks={setAllBooks}
                                    setQueredBooks={setQueredBooks}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default SearchBooks;
