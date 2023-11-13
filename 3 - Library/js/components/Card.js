"use strict";

import { ConfirmDelete, ModalForm } from "./Modal.js";
import { Tooltip } from "./Tooltip.js";
import { db } from "../db.js";
import { client } from "../client.js";

/** IMPORT MODULE */

export const Card = function (bookData) {
  const { id, title, author, pages, status } = bookData;

  // create DOM element
  const $card = document.createElement("div");
  $card.classList.add("card");
  $card.setAttribute("data-book", id);

  $card.innerHTML = `
    <div class="card-content">
      <div>
        <h1 class="title">${title}</h1>
        <h3 class="author">${author}</h3>
      </div>
      <div class="card-button-container">
        <button class="icon-btn" data-book-delete data-tooltip="Delete book">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="small"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
          <div class="state-layer"></div>
        </button>

        <button class="icon-btn" data-book-edit data-tooltip="Edit book">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="small"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
            />
            <path
              d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
            />
          </svg>

          <div class="state-layer"></div>
        </button>
      </div>
    </div>

    <div class="card-footer">
      <p class="pages">${pages} pages</p>
      <div>
        <div><span data-status-text>${
          status === 1 || status === "1" ? "Read" : "Not Read"
        }</span></div>
        <div data-book-status class="book-status">
          ${
            status === 1 || status === "1"
              ? `
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="read"
                data-tooltip="Change book status to unread"
              >
                <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-120q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
              </svg>`
              : `<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="not-read"
                data-tooltip="Change book status to read"
              >
                <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm400-120q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
              </svg>
              `
          }
        </div>
      </div>
    </div>
  `;

  // Initialize tooltip
  const tooltipElems = $card.querySelectorAll("[data-tooltip]");
  tooltipElems.forEach(($elem) => Tooltip($elem));

  /** Toggle Edit Button */
  const $editBtn = $card.querySelector("[data-book-edit]");
  $editBtn?.addEventListener("click", function (ev) {
    ev.stopImmediatePropagation();

    const modal = ModalForm(id, title, author, pages, status);
    modal.open();

    modal.onSubmit(function (bookData) {
      // console.log(bookData);
      const updatedBook = db.update.book(id, bookData);
      // console.log(updatedBook);
      // // update book in the UI
      client.book.update(id, updatedBook);
      modal.close();
    });
  });

  /** Toggle delete button */
  const $deleteBtn = $card.querySelector("[data-book-delete]");
  $deleteBtn.addEventListener("click", function (ev) {
    ev.stopImmediatePropagation();

    const modal = ConfirmDelete(title);
    modal.open();

    modal.onSubmit(function (isConfirm) {
      // console.log(isConfirm);
      if (isConfirm) {
        db.delete.book(id);
        client.book.delete(id);
      }

      modal.close();
    });
  });

  // change book status to read/unread
  const $statusBtn = $card.querySelector("[data-book-status]");
  $statusBtn.addEventListener("click", function (ev) {
    ev.stopImmediatePropagation();
    const bookStatusUpdate = db.update.bookStatus(id);
    client.book.update(id, bookStatusUpdate);
  });

  return $card;
};
