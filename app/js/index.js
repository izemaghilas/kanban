"use strict";

// init router
{
  router
  .add("/", kanban)
    .add("/tasks", tasks) // pass Tasks component
    .add("/kanban", kanban)
    .add("/members", member) // pass Members component
}

// init DB
{
  let tasks = taskDao.readAll();
  let contents = [
    "jouer à la guitare",
    "apprendre un framework javascript",
    "lire un livre",
    "apprendre le langage C++",
  ];
  contents.forEach((content, index) => {
    taskDao.save(new Task(index + 1, content, taskStatus.TO_PLAN));
  });
}

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
