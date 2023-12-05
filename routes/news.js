const express = require("express");
const axios = require("axios");

const router = express.Router();
const chatController = require("./openai.js"); // Replace with the actual path to your openai.js file

router.get("/news", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      "https://api.jsonserve.com/RNoAQ4"
    );
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
router.get("/nft", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=general&items=55&topic=NFT&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    // }));
    const response = await axios.get(
      //   `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      "https://api.jsonserve.com/3-v_wA"

      //NFT
    );
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
      message:
        "An error occurred while fetching data from the Cryptonews APIII.",
    });
  }
});
router.get("/prices-all", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price"
    );

    const symbols = ["BTCUSDT", "ETHUSDT", "MATICUSDT", "ADAUSDT"];
    const priceData = response.data.filter((item) =>
      symbols.includes(item.symbol)
    );

    if (priceData.length === 0) {
      return res.status(404).json({
        message: `Prices for symbols ${symbols.join(", ")} not found.`,
      });
    }

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Binance API.",
    });
  }
});

router.get("/prices/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price`
    );

    const priceData = {
      symbol: response.data.symbol,
      price: response.data.price,
    };

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Binance API.",
    });
  }
});
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await chatController.POST(prompt);
    res.send(result);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while processing the chat request.",
    });
  }
});
router.get("/regulations", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=general&items=7&topic=Regulations&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    //   id: news._id,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      "https://api.jsonserve.com/Uc6sXc"
    );
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
router.get("/ticker/:symbol", async (req, res) => {
  const token = process.env.NEWS_TOKEN;
  const symbol = req.params.symbol.toUpperCase();
  let symbolUrl = "";
  if (symbol === "BTC") {
    const btcUrl = "https://api.jsonserve.com/Fhtiar";
    symbolUrl = btcUrl;
  } else if (symbol === "MATIC") {
    const maticURL = "https://api.jsonserve.com/9ejN58";
    symbolUrl = maticURL;
  } else if (symbol === "ETH") {
    const ethURL = "https://api.jsonserve.com/8uCtVb";
    symbolUrl = ethURL;
  }

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1?tickers-only=${symbol}&items=10&page=1&token=${token}`
    // );

    // if (!response.data.data || !Array.isArray(response.data.data)) {
    //   console.error(
    //     `Unexpected response from Cryptonews API: ${response.data}`
    //   );
    //   return res.status(500).json({
    //     message: "An unexpected response was received from the Cryptonews API.",
    //   });
    // }

    // const tickerData = response.data.data.map((ticker) => ({
    //   image: ticker.image_url,
    //   title: ticker.title,
    //   preview: ticker.text,
    //   url: ticker.url,
    //   readMore: ticker.news_url,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      symbolUrl
    );
    const tickerData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));
    // Shuffle the news data
    shuffleArray(tickerData);
    res.json(tickerData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Cryptonews API.",
    });
  }
});
router.get("/live-prices", async (req, res) => {
  try {
    const ids =
      "bitcoin,ethereum,solana,polygon,cardano,shiba-inu,aave,near,dogecoin,floki,memag,flow,immutable,pepe,arbitrum,optimism,aptos,filecoin,tron,gmx,mana";
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
    );

    if (response.data.length === 0) {
      return res
        .status(404)
        .json({ message: `Prices for symbols ${ids} not found.` });
    }

    const priceData = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      price_change_24h: coin.price_change_percentage_24h,
    }));

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the CoinGecko API.",
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
