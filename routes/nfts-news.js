const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=general&items=3&topic=NFT&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    // }));

    const response = await axios
      .get
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      // "https://script.googleusercontent.com/macros/echo?user_content_key=6oeJxhb4FIKI01wqkuK1XJV9RzXMkdnWgf1c55yAwrtUY3RwU7AaMnGr28pErs5wjsTMNWuWd37gyvvymS0Gl7tUoJv1oF8Um5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO3SpkB9lGC4ecvxsI0fEgcCS08rLQqWQTwFO2DmgOz6mqsIGIjH01txHI8wMIClScBb1P8qOH6tQcBZSCW3hmN0OkwtuXrhOA&lib=MKASOD_uUu5GXoYNnEFuIflRjwUM6HP_Z"
      ();
    const newsData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));
    // Shuffle the news data
    shuffleArray(newsData);
    res.json(newsData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Cryptonews API.",
    });
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

module.exports = router;
