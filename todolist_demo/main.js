// 유저는 할 일을 추가할 수 있다.
// 각 할 일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것 표시 후 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.

let userValue = document.querySelector(".input_area input");
let todoBtn = document.querySelector(".input_area button");
let tabs = document.querySelectorAll("#taskTabs ul li");
let taskLists = [];
let target = "all";
let filterList = [];
let list = [];
userValue.addEventListener("focus", () => (userValue.value = ""));
userValue.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        toDoList();
    }
});
todoBtn.disabled = true;
let isEmpty = (event) => {
    if (event.target.value.length > 0) {
        todoBtn.disabled = false;
    } else {
        todoBtn.disabled = true;
    }
    return;
};

tabs.forEach((tabItem, index) => {
    tabItem.addEventListener("click", (event) => filter(event));
});

let toDoList = () => {
    // let todoThings = userValue.value;

    todoBtn.disabled = true;

    let task = {
        id: randomIdGenerate(),
        taskContent: userValue.value,
        isComplete: false,
    };
    taskLists.push(task);
    render();
};

let render = () => {
    let resultHTML = ``;
    list = [];

    if (target === "all") {
        list = taskLists;
    } else if (target === "ongoing") {
        list = filterList;
    } else {
        list = filterList;
    }

    list.forEach((item, index) => {
        if (item.isComplete) {
            resultHTML += `<div class="task active">
                <p>
                    ${item.taskContent}
                </p>
                <div class="wrap_btn">
                    <button class="check
                    " onClick="toggleComplete('${item.id}')">🔁</button>
                    <button class="remove"  onClick="deleteTask('${item.id}')">⛔</button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <p>
                    ${item.taskContent}
                </p>
                <div class="wrap_btn">
                    <button class="check" onClick="toggleComplete('${item.id}')">✅</button>
                    <button class="remove" onClick="deleteTask('${item.id}')">⛔</button>
                </div>
            </div>`;
        }
    });

    document.getElementById("taskList").innerHTML = resultHTML;
    userValue.value = "";
};

let toggleComplete = (itemId) => {
    taskLists.forEach((searchId) => {
        if (searchId.id == itemId) {
            searchId.isComplete = !searchId.isComplete;
            return;
        }
    });
    filter();
};

let deleteTask = (itemId) => {
    taskLists.forEach((searchId, index) => {
        if (searchId.id == itemId) {
            taskLists.splice(index, 1);
            return;
        }
    });
    filter();
};

let filter = (event) => {
    tabs.forEach((item, index) => {
        item.classList.remove("active");
    });

    if (event) {
        // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
        target = event.target.id;
        event.target.classList.add("active");
    }

    filterList = [];
    if (target === "ongoing") {
        //진행중 아이템 === isComplete = false
        taskLists.forEach((targeting) => {
            if (targeting.isComplete === false) {
                filterList.push(targeting);
            }
        });
    } else {
        //끝난 아이템 === isComplete = true
        taskLists.forEach((targeting) => {
            if (targeting.isComplete === true) {
                filterList.push(targeting);
            }
        });
    }

    render();
};

todoBtn.addEventListener("click", toDoList);
userValue.addEventListener("input", (event) => isEmpty(event));

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
