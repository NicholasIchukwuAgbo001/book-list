import styles from './booklist.module.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookList = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [newBook, setNewBook] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleDelete = (clickedIndex) => {
    setBooks((prevBooks) => prevBooks.filter((_, index) => index !== clickedIndex));
  };

  const addNewBookHandler = (event) => {
    setNewBook(event.target.value);
  };

  const submitNewBook = (event) => {
    event.preventDefault();
    if (newBook.trim() !== "") {
      setBooks((prevBooks) => [...prevBooks, newBook.trim()]);
      setNewBook("");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.pageBanner}>
          <h1 className={styles.title}>Book Collections</h1>
          <p>Books</p>
          <form className={styles.searchBooks} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={handleSearch}
            />
          </form>
        </div>
      </header>

      <div className={styles.bookList}>
        <h2 className={styles.subtitle}>Books to Read</h2>
        <ul>
          <AnimatePresence>
            {filteredBooks.map((book, index) => (
              <motion.li
                key={book + index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={styles.listItem}
              >
                <span className={styles.name}>{book}</span>
                <motion.span
                  whileHover={{ scale: 1.2, color: "#e63946" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(index)}
                  className={styles.delete}
                >
                  delete
                </motion.span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <form onSubmit={submitNewBook} className={styles.addBook}>
        <input
          onChange={addNewBookHandler}
          value={newBook}
          type="text"
          placeholder="Add a book..."
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add
        </motion.button>
      </form>
    </div>
  );
};

export default BookList;
