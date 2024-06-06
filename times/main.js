const API_KEY = `b9a9ff9658a14d68bc1268546f496163`;
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

let newsList = [];

const inpuboxShow = document.getElementById("inpuboxShow");
let menuList = document.getElementById("menuList");
const inputShow = () => {
    document.querySelector(".wrap_input").classList.toggle("active");
};

const getNews = async () => {
    const response = await fetch(url);
    const data = await response.json();

    newsList = data.articles;
    console.log(newsList);
    render();
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

const category = async (e) => {
    let target = e.target.innerHTML.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?category=${target}?country=us&apiKey=${API_KEY}`);
    getNews();
};

getNews();
