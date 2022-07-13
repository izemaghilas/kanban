"use strict";

export default function Drawer() {
  this.draw = function (element) {
    const root = document.getElementById("container");
    if (root !== null) {
      while (root.lastElementChild) {
        root.removeChild(root.lastElementChild);
      }
      root.appendChild(element.draw());
    }
  };
}
