"use strict";
function TaskList(title) {
    this.title = title;
    this.cards = document.createElement("div");
    
    this.add = function (card) {
      this.cards.appendChild(card.draw());
    };
  
    this.draw = function () {
      const wrapper = document.createElement("div");
      wrapper.className = "tasksWrapper"
      const list = document.createElement("div");
      list.className = "tasksList"
  
      const listHeader = document.createElement("span");
      listHeader.className = "list-header";
      listHeader.textContent = this.title;
      list.appendChild(listHeader);
  
      this.cards.className = "list-cards";
      list.appendChild(this.cards);
      wrapper.appendChild(list);
  
      // droppable cards
      this.cards.addEventListener("dragover", function (e) {
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
        }
      });
  
      return wrapper;
    };
  }
  
function Tasks() {
    
    this.draw = function() {
        const taskList = document.createElement("div");
        taskList.className = "tasks";

    let tasks = taskDao.readAll();

    const showTasks = (tasks) => {
      let toPlanList = new TaskList(taskStatus.TO_PLAN);
      toPlanList.className = "tasksList"
      tasks.forEach((task) => {
        if (task.status === taskStatus.TO_PLAN) {
          toPlanList.add(new TaskCard(task));
        }
      });

      taskList.appendChild(toPlanList.draw());
    };

    showTasks(tasks);
    return taskList;
    }
}

function TaskCard(task) {
    this.task = task;
    this.draw = function () {
      const card = document.createElement("span");
      card.id = `task-${task.id}`;
      card.className = "task";
      card.textContent = task.content;
  
      return card;
    };
  }

let tasks = new Tasks();