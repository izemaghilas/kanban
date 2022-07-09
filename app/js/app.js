"use strict";

function App() {
    this.draw = function() {
        const container = document.createElement("div");

        // children
        const tasks = document.createElement("button");
        tasks.innerText = "Tasks"; 
        const members = document.createElement("button");
        members.innerText = "Members";
        const kanban = document.createElement("button");
        kanban.innerText = "Kanban";

        // events
        tasks.addEventListener("click", function() {
            router.setPath("/tasks");
        });
        members.addEventListener("click", function() {
            router.setPath("/members");
        });
        kanban.addEventListener("click", function() {
            router.setPath("/kanban");
        });

        container.appendChild(tasks);
        container.appendChild(members);
        container.appendChild(kanban);

        return container;
    }
}
App.prototype = Object.create(Component.prototype);

const app = new App();