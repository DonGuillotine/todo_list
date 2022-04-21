// STEP 1 - Get all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// STEP 2 - Create an event Listener --onkeyup event
inputBox.onkeyup = ()=>{
    // Getting the user entered value
    let userEnteredValue = inputBox.value;
    // IF the user did not put spaces
    if(userEnteredValue.trim() != 0){
        // Add an active class to the button
        addBtn.classList.add("active");
    }
    else{
        // Remove the active class
        addBtn.classList.remove("active");
    }
}

// Calling the showTask function
showTasks();

// When the user clicks on the plus icon button
addBtn.onclick = ()=>{
    // Getting the input field value
    let userEnteredValue = inputBox.value;
    // Getting local storage
    let getLocalStorageData = localStorage.getItem("New Todo");
    // If the localstorage has no data
    if(getLocalStorageData == null){
        listArray = [];
    }else{
        // Transform json string into a javascript object
        listArray = JSON.parse(getLocalStorageData);
    }
    // Pushing or adding a new value in an array
    listArray.push(userEnteredValue);
    // Transforming the javascript object into a json string
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    // Remove the active class from the button once the task is added
    addBtn.classList.remove("active");
    console.log(listArray);
}


// Sttep 2 create a finction to display the todo items

function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        listArray = [];
    }
    else{
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksCount = document.querySelector(".pendingTasks");
    pendingTasksCount.textContent = listArray.length;
    // If the array length is greater than 0
    if(listArray.length > 0){
        // class="active"
        deleteAllBtn.classList.add("active");
    }
    else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index)=>{
        newLiTag = newLiTag + `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

// Step 3 - Create a delete function
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    // This delete or removes the li
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

// Step 4 - Create a delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}