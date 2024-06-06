const API_KEY = `b9a9ff9658a14d68bc1268546f496163`;
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let newsList = [];
let totalResults = 0;
let page = 1;
const pageSize = 5;
const groupSize = 5;

const inpuboxShow = document.getElementById("inpuboxShow");
const inputSearch = document.getElementById("inputSearch");
let inputKeyword = document.getElementById("inputKeyword");

const inputShow = () => {
    document.querySelector(".wrap_input").classList.toggle("active");
};
let menuList = document.querySelectorAll(".menus button");
menuList.forEach((menu) => {
    menu.addEventListener("click", (event) => getNewsByCategory(event));
});

inpuboxShow.addEventListener("click", inputShow);
inputKeyword.addEventListener("focus", () => (inputKeyword.value = ""));
inputKeyword.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        inputSearch.click();
    }
});

const getNews = async () => {
    try {
        url.searchParams.set("page", page); // url 에 &page=page
        url.searchParams.set("pageSize", pageSize); // url 에 &pageSize=pageSize
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            newsList = data.articles;
            console.log(data.articles);
            totalResults = data.totalResults;
            render();
            paginationRender();
            if (newsList.length === 0) {
                throw new Error("No result for this search");
            }
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message);
    }
};

const getLatesNews = async () => {
    getNews();
};

const getNewsByKeyword = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${inputKeyword.value}&apiKey=${API_KEY}`);

    getNews();
    inputKeyword.value = "";
};

const render = () => {
    const resultHTML = newsList
        .map(
            (item) =>
                `<div class="news">
                <div class="wrap_img">
                    <img src="${item.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"
        }" alt="">
                </div>
                <div class="wrap_info">
                    <h2>
                        ${item.title}
                        </h2>
                    <p>
                        ${item.content == null || item.content == "" ? "내용없음" : item.content.length > 200 ? item.content.substring(0, 200) + "..." : item.content}
                    </p>
                    <p>
                        <span>
                            ${item.source.name} * ${item.publishedAt}
                        </span>
                    </p>
                </div>
            </div>`
        )
        .join("");
    document.getElementById("newsBoard").innerHTML = resultHTML;
};

const errorRender = (errorMessage) => {
    const errorRender = `<p class="error">${errorMessage}</p>`;
    document.getElementById("newsBoard").innerHTML = errorRender;
};

getLatesNews();

const paginationRender = () => {
    // total results
    // page
    // page size
    // group size
    // totalpages
    // page group
    // last page / first page
    const totalpages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalpages) {
        lastPage = totalpages;
    }
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    let paginationHTML = ``;

    if (lastPage > totalpages) {
        lastPage = totalpages;
    }

    // 1.5
    // 4.8
    if (firstPage >= 4) {
        paginationHTML += `
        <li class="page-item">
            <a class="page-link" href="#"  onClick="moveToPage(1)">
                <<
            </a>
        </li>
        <li class="page-item" id="prev">
            <a class="page-link" href="#"  onClick="moveToPage(${page - 1})">
                <
            </a>
        </li>`;
    }
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `
        <li class="page-item ${i === page ? "active" : ""}" onClick="moveToPage(${i})">
            <a class="page-link" href="#">
                ${i}
            </a>
        </li>`;
    }

    if (lastPage < totalpages) {
        paginationHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onClick="moveToPage(${page + 1})">
                >
            </a>
        </li>
        <li class="page-item">
            <a class="page-link" href="#"  onClick="moveToPage(${totalpages})">
                >>
            </a>
        </li>
        `;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
    console.log(pageNum);
    page = pageNum;
    getNews();
};

const getNewsByCategory = async (event) => {
    let category = event.target.innerText.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    if (category === "all") {
        url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    }
    getNews();
};

inputSearch.addEventListener("click", getNewsByKeyword);
