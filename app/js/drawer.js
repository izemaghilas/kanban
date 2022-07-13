"use strict";

export default function Drawer () {
    this.root = document.getElementById("container");
    this.draw = function(element) {
        if(this.root !== null){
            while(this.root.lastElementChild) {
                this.root.removeChild(this.root.lastElementChild);
            }
            this.root.appendChild(element.draw());
        }


    }
}

//const drawer = new Drawer();