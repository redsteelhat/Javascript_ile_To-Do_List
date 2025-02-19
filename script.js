document.addEventListener("DOMContentLoaded", loadTasks);

// Görev ekleme fonksiyonu
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        showToast("Lütfen geçerli bir görev girin!");
        return;
    }

    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
}

// Görevleri ekrana yazdırma
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = getTasksFromLocalStorage();
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = `list-group-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Sil</button>
        `;
        taskList.appendChild(li);
    });
}

// Görev tamamlandı/geri al işlemi
function toggleTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Görev silme fonksiyonu
function deleteTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// LocalStorage'dan görevleri alma
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Sayfa yüklendiğinde görevleri getir
function loadTasks() {
    renderTasks();
}

// Bootstrap Toast Bildirimi
function showToast(message) {
    let toastBody = document.querySelector(".toast-body");
    toastBody.textContent = message;
    
    let toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
}
