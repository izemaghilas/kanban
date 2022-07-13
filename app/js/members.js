"use strict";

import { MemberDao } from "./dao.js";
import { Member } from "./models.js";

const memberDao = new MemberDao();

function MemberList(title) {
  this.title = title;
  this.cards = document.createElement("div");

  this.add = function (card) {
    this.cards.appendChild(card.draw());
  };

  this.draw = function () {
    const wrapper = document.createElement("div");
    wrapper.className = "membersWrapper";
    const list = document.createElement("div");
    list.className = "membersList";

    const listHeader = document.createElement("span");
    listHeader.className = "list-header";
    listHeader.textContent = this.title;
    list.appendChild(listHeader);

    this.cards.className = "list-cards";
    list.appendChild(this.cards);
    wrapper.appendChild(list);

    const button = document.createElement("button");
    const inputId = document.createElement("input");
    inputId.placeholder = "id";
    const inputLastName = document.createElement("input");
    inputLastName.placeholder = "nom";
    const inputFirstName = document.createElement("input");
    inputFirstName.placeholder = "prénom";
    const inputEmail = document.createElement("input");
    inputEmail.placeholder = "email";
    const inputJobTitle = document.createElement("input");
    inputJobTitle.placeholder = "poste professionnel";

    button.type = "button";
    button.innerHTML = "Ajouter";
    button.className = "btn-styled";
    button.onclick = function () {
      memberDao.save(
        new Member(
          inputId.value,
          inputFirstName.value,
          inputLastName.value,
          inputEmail.value,
          inputJobTitle.value
        )
      );
    };

    wrapper.appendChild(inputId);
    wrapper.appendChild(inputFirstName);
    wrapper.appendChild(inputLastName);
    wrapper.appendChild(inputEmail);
    wrapper.appendChild(inputJobTitle);
    wrapper.appendChild(button);

    return wrapper;
  };
}

export default function Members() {
  this.draw = function () {
    const memberList = document.createElement("div");
    memberList.className = "members";

    let members = memberDao.readAll();

    const showMembers = (members) => {
      let activeList = new MemberList("Actif");
      activeList.className = "membersList";
      members.forEach((member) => {
        activeList.add(new MemberCard(member));
      });

      //event listener on storage to refresh the members when it gets updated
      window.addEventListener("storage", (event) => {
        console.log("storage event");
        while (memberList.lastElementChild) {
          memberList.removeChild(memberList.lastElementChild);
        }
        let members = memberDao.readAll();
        showMembers(members);
      });

      memberList.appendChild(activeList.draw());
    };

    showMembers(members);
    return memberList;
  };
}

function MemberCard(member) {
  this.member = member;
  this.draw = function () {
    const card = document.createElement("span");
    card.id = `member-${member.id}`;
    card.className = "member";
    card.textContent =
      member.lastName +
      " " +
      member.firstName +
      " " +
      member.email +
      " " +
      member.jobTitle;

    return card;
  };
}
