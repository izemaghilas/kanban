"use strict";

function Drawer () {
    this.root = document.getElementById("container");
    this.draw = function(element) {
        while(this.root.lastElementChild) {
            this.root.removeChild(this.root.lastElementChild);
        }
        this.root.appendChild(element.draw());
    }
}

const drawer = new Drawer();