const API_KEY = `b9a9ff9658a14d68bc1268546f496163`;
let news = [];
const getNews = async () => {
    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    const response = await fetch(url);
    const data = await response.json();

    news = data.articles;
    console.log(news);
};

getNews();
