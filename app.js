const taskForm = document.getElementById("taskForm");
const tableBody = document.querySelector("tbody");
let idNumber = 0;
const tasks = [];

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  idNumber++;
  const taskName = document.getElementById("task-name");
  const category = document.getElementById("category");
  const deadline = document.getElementById("deadline");
  const status = document.getElementById("status");
  const task = {
    taskName: taskName.value,
    category: category.value,
    deadline: deadline.value,
    status: status.value,
    id: idNumber,
  };

  if (isPastDeadline(task.deadline)) {
    task.status = "Overdue";
  }

  tasks.push(task);
  displayTasks(tasks);

  taskName.value = "";
  category.value = "";
  deadline.value = "";
});

tableBody.addEventListener("change", (e) => {
  if (e.target.tagName === "SELECT") {
    for (let task of tasks) {
      if (task.id === Number(e.target.id)) {
        task.status = e.target.value;
        break;
      }
    }
  }
});

const btnAll = document.getElementById("btnAll");
const btnInProgress = document.getElementById("btnInProgress");
const btnCompleted = document.getElementById("btnCompleted");
const btnOverdue = document.getElementById("btnOverdue");

btnAll.addEventListener("click", () => {
  displayTasks(tasks);
  btnInProgress.style.backgroundColor = "white";
  btnCompleted.style.backgroundColor = "white";
  btnOverdue.style.backgroundColor = "white";
});

btnInProgress.addEventListener("click", () => {
  const newTasks = tasks.filter((task) => task.status === "In Progress");
  displayTasks(newTasks);
  btnInProgress.style.backgroundColor = "#56B0AA";
  btnCompleted.style.backgroundColor = "white";
  btnOverdue.style.backgroundColor = "white";
});

btnCompleted.addEventListener("click", () => {
  const newTasks = tasks.filter((task) => task.status === "Completed");
  displayTasks(newTasks);
  btnInProgress.style.backgroundColor = "white";
  btnCompleted.style.backgroundColor = "#56B0AA";
  btnOverdue.style.backgroundColor = "white";
});

btnOverdue.addEventListener("click", () => {
  const newTasks = tasks.filter((task) => task.status === "Overdue");
  displayTasks(newTasks);
  btnInProgress.style.backgroundColor = "white";
  btnCompleted.style.backgroundColor = "white";
  btnOverdue.style.backgroundColor = "#56B0AA";
});

const filterByCategory = document.getElementById("filterByCategory");

filterByCategory.addEventListener("input", () => {
  const newTasks = tasks.filter(
    (task) =>
      filterByCategory.value ===
      task.category.slice(
        0,
        Math.min(filterByCategory.value.length, task.category.length)
      )
  );

  displayTasks(newTasks);
});

function isPastDeadline(deadline) {
  const [year, month, day] = deadline.split("-").map(Number);
  const deadlineDate = new Date(year, month - 1, day);
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  return dateNow > deadlineDate;
}

function displayTasks(tasks) {
  tableBody.innerHTML = "";
  for (let task of tasks) {
    const row = document.createElement("tr");
    const tdTaskName = document.createElement("td");
    tdTaskName.innerText = task.taskName;
    const tdCategory = document.createElement("td");
    tdCategory.innerText = task.category;
    const tdDeadline = document.createElement("td");
    tdDeadline.innerText = task.deadline;
    const tdStatus = document.createElement("td");

    const select = document.createElement("select");
    select.id = task.id;
    const firstOption = document.createElement("option");
    firstOption.value = task.status;
    firstOption.innerText = task.status;
    select.appendChild(firstOption);

    for (let status of ["In Progress", "Completed", "Overdue"]) {
      if (task.status === status) {
        continue;
      } else {
        const option = document.createElement("option");
        option.value = status;
        option.innerText = status;
        select.appendChild(option);
      }
    }

    tdStatus.appendChild(select);

    row.appendChild(tdTaskName);
    row.appendChild(tdCategory);
    row.appendChild(tdDeadline);
    row.appendChild(tdStatus);
    tableBody.appendChild(row);
  }
}
