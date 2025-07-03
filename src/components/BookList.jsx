import styles from './booklist.module.css';
import { useState } from 'react';

const BookList = () => {
  const bookList = [
    "Name of the Wind",
    "The Wise Man's Fear",
    "Kafka on the Shore",
    "The Master and the Margarita"
  ];

  const [books, setBooks] = useState(bookList);
  const [newBook, setNewBook] = useState("");
  const [search, setSearch] = useState("");

  const handleDelete = (clickedIndex) => {
    const filteredBooks = books.filter((_, index) => index !== clickedIndex);
    setBooks(filteredBooks);
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

  const filteredBooks = books.filter((book) =>{
    return book.toLowerCase().includes(search.toLowerCase());
  });

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
          {filteredBooks.map((book, index) => (
            <li key={index}>
              <span className={styles.name}>{book}</span>
              <span onClick={() => handleDelete(index)} className={styles.delete}>
                delete
              </span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={submitNewBook} className={styles.addBook}>
        <input
          onChange={addNewBookHandler}
          value={newBook}
          type="text"
          placeholder="Add a book..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BookList;
