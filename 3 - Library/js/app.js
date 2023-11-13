/**
 *  @copyright davemental 2023
 *  Simple library App, with localstorage - Odin Project
 */

"use strict";

/** Module import */
import { Tooltip } from "./components/Tooltip.js";
import { ModalForm } from "./components/Modal.js";
import { db } from "./db.js";
import { client } from "./client.js";

/** BOOK STATUS TOGGLE */
const $statusBtn = document.querySelector("[data-status]");
const $statusText = document.querySelector("[data-status-text]");

$statusBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if ($statusBtn.getAttribute("data-status") == "read") {
    $statusBtn.setAttribute("data-status", "not-read");
    $statusText.innerHTML = "Read";
  } else {
    $statusBtn.setAttribute("data-status", "read");
    $statusText.innerHTML = "Not Read";
  }
});

/** Initialize tooltip behavior for all DOM elements with a 'data-tooltip attribute*/
const $tooltipElements = document.querySelectorAll("[data-tooltip]");
$tooltipElements.forEach(($elem) => Tooltip($elem));

/** TOGGLE ADD NEW BOOK */
const $addBookBtn = document.querySelector("[data-add-book]");
$addBookBtn?.addEventListener("click", function () {
  const modal = ModalForm();
  modal.open();

  modal.onSubmit((bookOjb) => {
    //save new book local storage and render to DOM
    const bookData = db.post.book(bookOjb);
    client.book.create(bookData);
    modal.close();
  });
});

/** Render existing notebook from database */
const renderBooks = function () {
  const bookList = db.get.allBooks();
  client.book.read(bookList);
};

renderBooks();
