const axios = require("axios");

const symbol = "YOUR_SYMBOL"; // Replace with your actual symbol (e.g., 'BTC')
const token = "ol7ywa0vqzty20licc6mrukuyiejzjdwtvbhbhle"; // Replace with your actual API token

const url = `https://cryptonews-api.com/api/v1/category?section=general&items=50&topic=Regulations&page=1&token=${token}`;

axios
  .get(url)
  .then((response) =>
    response.data.data.forEach((news) => console.log(news.news_url))
  )
  .catch((error) => console.error("Error fetching data:", error));
