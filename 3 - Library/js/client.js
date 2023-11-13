"use strict";

/** IMPORT MODULES */
import { Card } from "./components/Card.js";

const $bookPanel = document.querySelector("[data-book-panel]");

export const client = {
  book: {
    create(bookData) {
      // Append card
      const $card = Card(bookData);
      $bookPanel.prepend($card);
    },

    read(bookList) {
      bookList.forEach((bookData) => {
        const $card = Card(bookData);
        $bookPanel.appendChild($card);
      });
    },

    update(id, bookData) {
      const $oldCard = document.querySelector(`[data-book="${id}"]`);
      const $newCard = Card(bookData);

      console.log();
      $bookPanel.replaceChild($newCard, $oldCard);
    },

    delete(id) {
      const $deletedCard = document.querySelector(`[data-book="${id}"]`);
      $deletedCard.remove();
    },
  },
};
