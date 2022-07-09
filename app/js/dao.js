"use strict";

function TaskDao() {
    this.readAll = function() {
        let tasks = [];
        let keys = Object.keys(localStorage);
        keys.forEach(key=>{
            if((/task\-[0-9]+/g).test(key)) {
                let obj = JSON.parse(localStorage.getItem(key));
                tasks.push(new Task(obj.id, obj.content, obj.status));
            }
        });

        return tasks;
    }

    this.find = function(key) {
        let obj = JSON.parse(localStorage.getItem(key));
        return new Task(obj.id, obj.content, obj.status);
    }

    this.save = function(task) {
        localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
    }
    
    this.update = function(task) {
        localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
    }
}

const taskDao = new TaskDao();