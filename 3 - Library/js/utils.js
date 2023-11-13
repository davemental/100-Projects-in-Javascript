"use strict";

/** Generate bookId base on the current time stamp */
const generateBookId = function () {
  return new Date().getTime().toString();
};

/** Finds the book by its id in database */
const findBook = function (db, id) {
  return db.books.find((book) => book.id === id);
};

/** Find book index */
const findBookIndex = function (db, id) {
  return db.books.findIndex((item) => item.id === id);
};

export { generateBookId, findBook, findBookIndex };
