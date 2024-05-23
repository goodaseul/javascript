// 유저가 값 입력
// +버튼을 클릭하면, 할일 추가
// delete버튼 누르면 할일 삭제
// check 버튼 누르면 할일  끝남 밑줄 감

// 진행 중 끝난 탭을 누르면, 언더바가 이동
// 끝남탭, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let inputBox = document.querySelector("input");
let addItemBtn = document.getElementById("addItemBtn");

addItemBtn.addEventListener("click", toDoList);

let tabs = document.querySelectorAll(".task_tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) {
        filter(e);
    });
}

function toDoList() {
    // let taskContent = inputBox.value;
    let task = {
        id: randomIdGenerate(),
        taskContent: inputBox.value,
        isComplete: false,
    };
    taskList.push(task);
    render();
}

function render() {
    let resultHTML = "";
    list = [];
    if (mode == "all") {
        list = taskList;
    } else {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += ` <div class="task">
            <p class="task_done">${list[i].taskContent}</p>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">chk</button>
                <button onClick="removeTask('${list[i].id}')">Del</button>
            </div>
        </div>
        `;
        } else {
            resultHTML += ` <div class="task">
            <p>${list[i].taskContent}</p>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">chk</button>
                <button onClick="removeTask('${list[i].id}')">Del</button>
            </div>
        </div>
        `;
        }
    }

    document.getElementById("taskList").innerHTML = resultHTML;
}

function toggleComplete(valueId) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == valueId) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function removeTask(valueId) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === valueId) {
            taskList.splice(i, 1);
        }
    }

    filter();
}

function filter(e) {
    //
    if (e) {
        mode = e.target.id;
        // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
    }
    filterList = [];
    if (mode == "all") {
        // 전체리스트
        render();
    } else if (mode == "ongoing") {
        // is == false
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode == "done") {
        // is == true
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
