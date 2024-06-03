const API_KEY = `b9a9ff9658a14d68bc1268546f496163`;
let newsList = [];
const menus = document.querySelectorAll("#menuList button");
menus.forEach((menu, index) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
    try {
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message);
    }
};

const getLatestNews = async () => {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("searchInput").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    getNews();
};

// UI그려주는 함수
const render = () => {
    const newsHTML = newsList
        .map(
            (news) => `
                <div class="news row">
                    <div class="col-lg-4">
                        <img src=${news.urlToImage} alt="">
                    </div>
                    <div class="col-lg-8">
                        <h2>
                            ${news.title}
                        </h2>
                        <p>
                            ${news.description}
                        </p>
                        <div>
                            ${news.source.name} * ${news.publishedAt}
                        </div>
                    </div>
                </div>`
        )
        .join("");
    document.getElementById("newsBoard").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;

    document.getElementById("newsBoard").innerHTML = errorHTML;
};

const paginationRender = () => {
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;

    let totalPages = Math.ceil(totalResults / pageSize);
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = `<li class="page-item"  onClick="moveToPage(${page - 1})"><a class="page-link" href="#">Previous</a></li>`;
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class='page-item ${i === page ? "active" : " "}' onClick="moveToPage(${i})">
        <a class="page-link"  href="#">
            ${i}
        </a>
        </li> `;
    }

    paginationHTML += `<li class="page-item" onClick="moveToPage(${page + 1})"><a class="page-link" href="#">Next</a></li>`;
    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pagenum) => {
    page = pagenum;
    getNews();
};

getLatestNews();

const getNewsByCategory = async (event) => {
    const target = event.target.innerHTML.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${target}&apiKey=${API_KEY}`);

    getNews();
};
