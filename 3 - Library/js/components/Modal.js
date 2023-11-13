"use strict";

/** IMPORT MODULE */
import { Tooltip } from "./Tooltip.js";

// crate overlay
const $overlay = document.createElement("div");
$overlay.classList.add("overlay", "modal-overlay");

const ModalForm = function (
  id = "",
  title = "",
  author = "",
  pages = 0,
  status = 0
) {
  // create modal form
  const $modal = document.createElement("div");
  $modal.classList.add("modal");

  $modal.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">Add New Book</h2>
      <button class="icon-btn" data-close-btn data-tooltip="Close this form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div class="state-layer"></div>
      </button>
    </div>
    <div class="modal-content">

      <input type="text" value="${title}" placeholder="Title" data-book-field />

      <input
        type="text"
        value="${author}"
        placeholder="Author"
        data-book-field
      />

      <input
        type="number"
        value="${pages}"
        placeholder="Pages"
        data-book-field
      />

      <select data-book-field>
        <option value="1" ${
          status === 1 || status === "1" ? "selected" : ""
        }>Read</option>
        <option value="0" ${
          status === 0 || status === "0" ? "selected" : ""
        }>Not Read</option>
      </select>
    </div>

    <div class="modal-footer">
      <button class="primary-btn" data-submit-btn>Save</button>
    </div>
  `;

  // Initialize
  const [$title, $author, $pages, $status] =
    $modal.querySelectorAll("[data-book-field]");
  const $saveBtn = $modal.querySelector("[data-submit-btn]");

  //open modal by adding to the DOM
  const open = function () {
    document.body.appendChild($overlay);
    document.body.appendChild($modal);
    $title.focus();
  };

  //remove modal by removing to the DOM
  const close = function () {
    document.body.removeChild($modal);
    document.body.removeChild($overlay);

    //check for tooltip if exist, then remove
    let tooltipElem = document.getElementsByClassName("tooltip")[0];
    // console.log(document.body.contains(tooltipElem));
    if (document.body.contains(tooltipElem)) {
      tooltipElem.parentNode.removeChild(tooltipElem);
    }
  };

  // attaches close
  const $closeBtn = $modal.querySelector("[data-close-btn]");
  $closeBtn.addEventListener("click", close);

  // initialized tooltip in form
  Tooltip($modal.querySelector("[data-tooltip]"));

  // save data
  const onSubmit = function (callback) {
    $saveBtn.addEventListener("click", function () {
      const bookData = {
        id: id,
        title: $title.value,
        author: $author.value,
        pages: $pages.value,
        status: $status.value,
      };

      // console.log(bookData.status);
      bookData.title === ""
        ? $title.classList.add("required")
        : $title.classList.remove("required");

      bookData.author === ""
        ? $author.classList.add("required")
        : $author.classList.remove("required");

      if (bookData.title != "" && bookData.author != "") {
        callback(bookData);
      }
    });
  };

  // remove required on typing
  $title.addEventListener("keyup", () => $title.classList.remove("required"));
  $author.addEventListener("keyup", () => $author.classList.remove("required"));

  return { open, close, onSubmit };
};

const ConfirmDelete = function (title) {
  const $modal = document.createElement("div");
  $modal.classList.add("modal");

  $modal.innerHTML = `<div class="modal-content">
      <p class="modal-text">
        Are you sure you want to delete <strong>"${title}"</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        class="primary-btn"
        data-cancel-delete-btn
        data-tooltip="Cancel delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="small"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>

        Cancel
      </button>

      <button
        class="danger-btn"
        data-confirm-delete-btn="true"
        data-tooltip="Confirm delete"
      >
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
        Delete
      </button>
    </div>`;

  //open modal by appending to DOM
  const open = function () {
    document.body.appendChild($modal);
    document.body.appendChild($overlay);
  };

  // close by removing to DOM
  const close = function () {
    document.body.removeChild($modal);
    document.body.removeChild($overlay);
  };

  // Toggle cancel button
  const $cancelBtn = $modal.querySelector("[data-cancel-delete-btn]");
  $cancelBtn.addEventListener("click", close);

  const $confirmBtn = $modal.querySelector("[data-confirm-delete-btn]");

  // handle delete sumbmission
  const onSubmit = function (callback) {
    $confirmBtn.addEventListener("click", function () {
      // console.log(this.dataset.confirmDeleteBtn);
      const isConfirm = this.dataset.confirmDeleteBtn === "true" ? true : false;
      callback(isConfirm);
    });
  };

  return { open, close, onSubmit };
};

export { ModalForm, ConfirmDelete };
