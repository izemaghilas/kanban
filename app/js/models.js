"use strict";

export function Task(id, content, status) {
  this.id = id;
  this.content = content;
  this.status = status;
  this.setStatus = function (status) {
    this.status = status;
  };
}

export function Member(id, firstName, lastName, email, jobTitle) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.jobTitle = jobTitle;
}
