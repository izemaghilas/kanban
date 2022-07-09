"use strict";

function Task(id, content, status) {
    this.id = id;
    this.content = content;
    this.status = status;
    this.setStatus = function(status) {
        this.status = status;
    }
}

function Members() {
    
}