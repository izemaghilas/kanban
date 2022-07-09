class Task {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.status = IN_PROGRESS;
    }
    
    draw() {
        const container = document.createElement("div");
        return container;
    }
}

let task1 = new Task(1, "");
let task2 = new Task(2, "");
let task3 = new Task(3, "");
let task4 = new Task(4, "");