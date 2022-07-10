"use strict";

function Task(id, content, status) {
  this.id = id;
  this.content = content;
  this.status = status;
  this.setStatus = function (status) {
    this.status = status;
  };
}

function Members(firstName, lastName, email, jobTitle) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.jobTitle = jobTitle;
}
