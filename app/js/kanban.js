"use strict";

import { TaskDao } from "./dao.js";
import { taskStatus } from "./constants.js";

const taskDao = new TaskDao();

function Card(task) {
  this.task = task;
  this.draw = function () {
    const card = document.createElement("span");
    card.id = `task-${task.id}`;
    card.className = "card";
    card.textContent = task.content;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn-press";
    button.id = "btn-press";
    button.onclick = function () {
      presse_pappier(card.textContent);
    };
    card.appendChild(button);

    // draggable card
    card.draggable = true;
    card.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", task.id);
      e.dataTransfer.dropEffect = "move";
    });

    return card;
  };
}

function List(title) {
  this.title = title;
  this.cards = document.createElement("div");

  this.add = function (card) {
    this.cards.appendChild(card.draw());
  };

  this.draw = function () {
    const wrapper = document.createElement("div");
    const list = document.createElement("div");
    wrapper.className = "list-wrapper";
    list.className = "list";

    const listHeader = document.createElement("span");
    listHeader.className = "list-header";
    listHeader.textContent = this.title;
    list.appendChild(listHeader);

    this.cards.className = "list-cards";
    list.appendChild(this.cards);
    wrapper.appendChild(list);

    // droppable cards
    this.cards.addEventListener("dragover", function (e) {
      navigator.vibrate(300);
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });
    this.cards.addEventListener("drop", function (e) {
      e.preventDefault();
      let taskId = `task-${e.dataTransfer.getData("text/plain")}`;
      let task = taskDao.find(taskId);
      this.appendChild(document.getElementById(taskId));

      // set task status
      if (title === taskStatus.TO_PLAN) {
        task.setStatus(taskStatus.TO_PLAN);
        taskDao.update(task);
      } else if (title === taskStatus.IN_PROGRESS) {
        task.setStatus(taskStatus.IN_PROGRESS);
        taskDao.update(task);
      } else if (title === taskStatus.TO_VALIDATE) {
        task.setStatus(taskStatus.TO_VALIDATE);
        taskDao.update(task);
      } else if (title === taskStatus.DONE) {
        task.setStatus(taskStatus.DONE);
        taskDao.update(task);
      }
    });

    return wrapper;
  };
}
function presse_pappier(text) {
  console.log(text);
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("text copied");
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

export default function Kanban() {
  this.draw = function () {
    const kanban = document.createElement("div");
    kanban.className = "kanban";

    let tasks = taskDao.readAll();

    const showTasks = (tasks) => {
      let toPlanList = new List(taskStatus.TO_PLAN);
      let inProgressList = new List(taskStatus.IN_PROGRESS);
      let toValidateList = new List(taskStatus.TO_VALIDATE);
      let doneList = new List(taskStatus.DONE);
      tasks.forEach((task) => {
        if (task.status === taskStatus.TO_PLAN) {
          toPlanList.add(new Card(task));
        } else if (task.status === taskStatus.IN_PROGRESS) {
          inProgressList.add(new Card(task));
        } else if (task.status === taskStatus.TO_VALIDATE) {
          toValidateList.add(new Card(task));
        } else if (task.status === taskStatus.DONE) {
          doneList.add(new Card(task));
        }
      });

      kanban.appendChild(toPlanList.draw());
      kanban.appendChild(inProgressList.draw());
      kanban.appendChild(toValidateList.draw());
      kanban.appendChild(doneList.draw());
    };

    //event listend on storage to refresh the tasks
    window.addEventListener("storage", (event) => {
      while (kanban.lastElementChild) {
        kanban.removeChild(kanban.lastElementChild);
      }
      let tasks = taskDao.readAll();
      showTasks(tasks);
    });

    showTasks(tasks);
    return kanban;
  };
}
