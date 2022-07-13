"use strict";
import { TaskDao } from "./dao.js";
import { Task } from "./models.js";
import { taskStatus } from "./constants.js";


const taskDao = new TaskDao();

export function TaskList(title) {
  const path=location.pathname.split("/");
  const taskId=path[path.length-1];
  console.log(taskId);
  const task=taskDao.find(`task-${taskId}`);


  this.title = title;
  this.cards = document.createElement("div");

  this.add = function (card) {
    this.cards.appendChild(card.draw());
  };

  this.draw = function () {
    const wrapper = document.createElement("div");
    wrapper.className = "tasksWrapper";
    const list = document.createElement("div");
    list.className = "tasksList";

    const listHeader = document.createElement("span");
    listHeader.className = "list-header";
    listHeader.textContent = this.title;
    list.appendChild(listHeader);

    this.cards.className = "list-cards";
    list.appendChild(this.cards);
    
    
    const button = document.createElement("button");
    const inputTask = document.createElement("input");
    inputTask.value = task.content;
    inputTask.className = "user-input";

    button.type = "button";
    button.innerHTML = "Modifier";
    button.className = "button";
    button.onclick = function () {
      taskDao.update(new Task(
        taskId, 
        inputTask.value,
        taskStatus.TO_PLAN));
      history.back();
    };
    wrapper.appendChild(inputTask);
    wrapper.appendChild(button);

    return wrapper;
  };
}
export default function TaskUpdate() {

  this.draw = function () {
    const taskList = document.createElement("div");
    taskList.className = "tasks";
    let tasks = taskDao.readAll();

    const showTasks = (tasks) => {
      let toPlanList = new TaskList(taskStatus.TO_PLAN);
      toPlanList.className = "tasksList";
      tasks.forEach((task) => {
        if (task.status === taskStatus.TO_PLAN) {
          toPlanList.add(new TaskCard(task));
        }
      });

      //event listener on storage to refresh the tasks when it gets updated
      window.addEventListener("storage", (event) => {
        console.log("storage event");
        while (taskList.lastElementChild) {
          taskList.removeChild(taskList.lastElementChild);
        }
        let tasks = taskDao.readAll();
        showTasks(tasks);
      });

      taskList.appendChild(toPlanList.draw());
    };

    showTasks(tasks);
    return taskList;
  };
}
function TaskCard(task) {
  this.task = task;
  this.draw = function () {
    const card = document.createElement("span");
    card.id = `task-${task.id}`;
    card.className = "task";
    card.textContent = task.content;
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML="copier"
    button.className = "btn-press";
    button.id = "btn-press";
    button.onclick = function () {
      presse_pappier(card.textContent);
    };
    const buttonM = document.createElement("button");
    buttonM.type = "button";
    buttonM.innerHTML="Modifier"
    buttonM.className = "btn-press";
    buttonM.id = "btn-modifier";
    buttonM.onclick = function () {
      console.log("test");
      router.setPath('/task');
    };
    card.appendChild(button);
    card.appendChild(buttonM);


    return card;
  };
}
