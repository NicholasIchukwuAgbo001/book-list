import {test, expect, beforeEach, afterEach} from "vitest";
import BookList from "../components/BookList";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";


test("sum of 2 and 3 is 5", () => {
    const answer = 2 + 3;
    expect(answer).toBe(5);
});

const bookList = [
    "Name of the Wind",
    "The Wise Man's Fear",
    "Kafka on the Shore",
    "The Master and the Margarita"
]

beforeEach(() => {
    render(<BookList books = {bookList}/>)
});

afterEach(() => {
    cleanup();
});

test("test that 'book collection' is present", () => {
    const textContent = screen.getByText(/book collection/i);
    expect(textContent).toBeTruthy();

});

test("test that 'books' collection is present", () => {
    const textContent = screen.getByText(/books to read/i);
    expect(textContent).toBeTruthy();
});


test("That the mock list displays on my screen", () => {
    const books= screen.getAllByRole("listitem");
    expect(books).toHaveLength(bookList.length);
});

test("that i can delete a book", () => {
    const deleteBtn = screen.getAllByText(/delete/i);
    fireEvent.click(deleteBtn[0]);
    const books = screen.getAllByRole("listitem");
    expect(books).toHaveLength(bookList.length - 1);
});

test("test add new book form works", ()=>{
    const addBookInput = screen.getByPlaceholderText(/add a book/i)
    fireEvent.change(addBookInput, {target:{value: "Oliver Twist"}})

    const form = addBookInput.closest("form")
    fireEvent.submit(form)
    const books = screen.getAllByRole("listitem")
    expect(books).toHaveLength(bookList.length + 1)
})

test("test search book form works", () => {
  const searchBook = screen.getByPlaceholderText(/search books/i);
  fireEvent.change(searchBook, { target: { value: "Kafka" } });
  const presentBooks = screen.getAllByRole("listitem");
  expect(presentBooks).toHaveLength(1);
});

test("test search book form works", () => {
  const searchBook = screen.getByPlaceholderText(/search books/i);
  fireEvent.change(searchBook, { target: { value: "Niko's books" } });
  const presentBooks = screen.getAllByRole("listitem");
  expect(presentBooks).toHaveLength(0);
});
