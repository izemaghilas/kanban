"use strict";

function Tasks() {
    
    this.draw = function() {
        const container = document.createElement("div");
        container.style.width = "100px";
        container.style.height = "100px";
        container.style.backgroundColor = "green";
        
        return container;
    }
}
Tasks.prototype = Object.create(Component.prototype);