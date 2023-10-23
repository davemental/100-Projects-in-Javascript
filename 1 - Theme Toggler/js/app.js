"use strict";

/**
 *  Module imprt
 */

import { Tooltip } from "./tooltip.js";

/**
 *  Initialize tooltip behavior for all DOM elements with a "data-tooltip" attribute.
 */
const /** {Array<HTMLElement>} */ $tooltipElems =
    document.querySelectorAll("[data-tooltip]");
$tooltipElems.forEach(($elem) => {
  Tooltip($elem);
});
