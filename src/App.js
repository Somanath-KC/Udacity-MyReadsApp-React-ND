import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBooks from "./components/SearchBooks";
import BookShelfPage from "./components/BookShelfPage";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function App() {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        let isMounted = true;

        BooksAPI.getAll()
            .then((data) => {
                if (isMounted && data.length > 0) setAllBooks([...data]);
            })
            .catch((err) => {
                console.log("error triggered in bookshelf page");
                if (isMounted) setAllBooks([]);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route
                    exact
                    element={
                        <BookShelfPage
                            allBooks={allBooks}
                            setAllBooks={setAllBooks}
                        />
                    }
                    path="/"
                />
                <Route
                    exact
                    element={
                        <SearchBooks
                            allBooks={allBooks}
                            setAllBooks={setAllBooks}
                        />
                    }
                    path="/search"
                />
            </Routes>
        </div>
    );
}

export default App;
