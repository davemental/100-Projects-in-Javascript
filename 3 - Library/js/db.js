"use strict";

import { generateBookId, findBook, findBookIndex } from "./utils.js";

// DB object
let bookDB = {};

// Initialize local databases. Load if exist, otherwise create and stored
const initDB = function () {
  const db = localStorage.getItem("bookDB");

  if (db) {
    bookDB = JSON.parse(db);
  } else {
    bookDB.books = [];
    localStorage.setItem("bookDB", JSON.stringify(bookDB));
  }
};

initDB();

// Reads/Load the localstorage data into global variable
const readDB = function () {
  bookDB = JSON.parse(localStorage.getItem("bookDB"));
};

const writeDB = function () {
  localStorage.setItem("bookDB", JSON.stringify(bookDB));
};

export const db = {
  post: {
    book(object) {
      readDB();

      const bookData = {
        id: generateBookId(),
        ...object,
        postedOn: new Date().getTime(),
      };

      //   console.log(bookData);
      bookDB.books.push(bookData);
      writeDB();

      return bookData;
    },
  },

  get: {
    allBooks() {
      readDB();
      return bookDB.books;
    },
  },

  update: {
    book(id, object) {
      readDB();

      const oldBook = findBook(bookDB, id);
      const newBook = Object.assign(oldBook, object);
      writeDB();

      return newBook;
    },

    bookStatus(id) {
      readDB();

      const book = findBook(bookDB, id);
      book.status = book.status === 1 ? 0 : 1;

      writeDB();
      return book;
    },
  },

  delete: {
    book(id) {
      readDB();

      const bookIndex = findBookIndex(bookDB, id);
      // console.log(bookIndex);

      bookDB.books.splice(bookIndex, 1);
      writeDB();
    },
  },
};
