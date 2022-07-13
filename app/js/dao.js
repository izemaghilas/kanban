"use strict";

import {Member, Task} from './models.js';

export function TaskDao() {
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

export function MemberDao() {
    this.readAll = function() {
        let members = [];
        let keys = Object.keys(localStorage);
        keys.forEach(key=>{
            if((/member\-[0-9]+/g).test(key)) {
                let obj = JSON.parse(localStorage.getItem(key));
                members.push(new Member(obj.id, obj.firstName, obj.lastName, obj.email, obj.jobTitle));
            }
        });

        return members;
    }

    this.find = function(key) {
        let obj = JSON.parse(localStorage.getItem(key));
        return new Member(obj.id, obj.firstName, obj.lastName, obj.email, obj.jobTitle);
    }

    this.save = function(member) {
        localStorage.setItem(`member-${member.id}`, JSON.stringify(member));
        window.dispatchEvent(new Event('storage'));
    }

    this.update = function(member) {
        localStorage.setItem(`member-${member.id}`, JSON.stringify(member));
        window.dispatchEvent(new Event('storage'));
    }
}


//const taskDao = new TaskDao();

//const memberDao = new MemberDao();