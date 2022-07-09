"use strict";

function Member() {
    this.draw = function() {
        const container = document.createElement("div");
        container.style.width = "100px";
        container.style.height = "100px";
        container.style.backgroundColor = "red";
        container.style.borderRadius = "50%";
        
        return container;
    }
}
Member.prototype = Object.create(Component.prototype);

const member = new Member();