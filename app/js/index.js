"use strict";


import Kanban from './kanban.js';
import Members from './members.js';
import Router from "./router.js";
import Tasks from "./tasks.js";
import {TaskDao} from "./dao.js";
import {Task} from "./models.js";
import {taskStatus} from "./constants.js";


// init index page
const router = new Router();
const kanban = new Kanban();
const tasks = new Tasks();
const members = new Members();
const taskDao = new TaskDao();

  let body = document.createElement("body");
  body.id = "body";
  let navbar = document.createElement('div');
  navbar.id = "navbar";
  let button_tasks = document.createElement('button');
  button_tasks.innerHTML = "Tasks";
  button_tasks.id = "btn-tasks";
  button_tasks.onclick = function () {router.setPath("/tasks")};
  let button_members = document.createElement('button');
  button_members.innerHTML = "Members";
  button_members.id = "btn-members";
  button_members.onclick = function () {router.setPath("/members")};
  let button_kanban = document.createElement('button');
  button_kanban.innerHTML = "Kanban";
  button_kanban.id = "btn-kanban";
  button_kanban.onclick = function () {router.setPath('/kanban')};
  navbar.append(button_tasks, button_members, button_kanban);
  body.appendChild(navbar);
  document.body = body;

// init router

{
  router
  .add("/", kanban)
    .add("/tasks", tasks) // pass Tasks component
    .add("/kanban", kanban)
    .add("/members", members) // pass Members component
}

// init DB

  //let tasks = taskDao.readAll();
   let contents = [
    "jouer à la guitare",
    "apprendre un framework javascript",
    "lire un livre",
    "apprendre le langage C++",
  ];
  contents.forEach((content, index) => {
    taskDao.save(new Task(index + 1, content, taskStatus.TO_PLAN));
  });

// run SPA
{
  router.draw();
  window.addEventListener("pagechange", function (e) {
    router.draw();
  });
  window.addEventListener("popstate", function () {
    router.draw();
  });
}

// const container = document.getElementById("container");
// console.log(window.location.href);

// init => store tasks, members and kanban in browser

// Kanban
// toPlan: Array<Task>, inProgress: Array<Task>, toValidate: Array<Task>, done: Array<Task>

// Task
// content: string, status: string

// Member
// firstName: string, lastName: string, email: string, jobTitle: string
