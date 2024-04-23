import React, { useEffect } from "react";
import { useState } from "react";
import * as BooksAPI from "../BooksAPI";

const Book = ({ book, allBooks, queredBooks, setAllBooks, setQueredBooks }) => {
    const {
        title = " ",
        authors = [],
        imageLinks = {},
        bookShelf = allBooks.find((b) => b.id === book.id)
            ? allBooks.find((b) => b.id === book.id).shelf
            : "none",
    } = book;
    // Default Thumbnail
    if (
        Object.keys(imageLinks).length === 0 ||
        imageLinks.thumbnail === undefined
    )
        imageLinks.thumbnail =
            "https://pixabay.com/get/g12b68307211a79cc0519fb0879373bf491536d23686c4c72beec2d9d380b923db17865ae3423dfb53e00149cd4c2bcff697b9df095d2a12046ba0224719ccd6c37af5a614c137245a29d05d7a36f2d8b_640.png";

    const [shelf, setShelf] = useState(bookShelf);

    useEffect(() => {
        let isMounted = true;
        if (shelf !== book.shelf) {
            BooksAPI.update(book, shelf).then((data) => {
                if (isMounted) {
                    book.shelf = shelf;
                    if (queredBooks) {
                        setQueredBooks([
                            ...queredBooks.filter((b) => b.id !== book.id),
                            book,
                        ]);
                        setAllBooks([
                            ...allBooks.filter((b) => b.id !== book.id),
                            book,
                        ]);
                    } else {
                        setAllBooks([
                            ...allBooks.filter((b) => b.id !== book.id),
                            book,
                        ]);
                    }
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [shelf]);

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${imageLinks.thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        value={shelf || "none"}
                        onChange={(e) => setShelf(e.target.value)}
                    >
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(", ")}</div>
        </div>
    );
};

export default Book;
