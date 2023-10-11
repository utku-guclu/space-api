const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(cors());

const newspapers = [
  {
    name: "livescience",
    address: "https://www.livescience.com/space/astronomy/planets",
  },
  {
    name: "theguardian",
    address: "https://www.theguardian.com/science/space",
  },
  {
    name: "space",
    address: "https://www.space.com/search?searchTerm=planets",
  },
  {
    name: "earthsky",
    address: "https://earthsky.org/",
  },
  {
    name: "timeanddate",
    address: "https://www.timeanddate.com/astronomy/",
  },
  {
    name: "nasa",
    address: "https://www.nasa.gov",
  },
  {
    name: "esa",
    address: "https://www.esa.int",
  },
  {
    name: "astronomy",
    address: "https://astronomy.com",
  },
  {
    name: "spacex",
    address: "https://www.spacex.com",
  },
  {
    name: "seti",
    address: "https://www.seti.org",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $(
      'a:contains("star"), a:contains("astronomy"), a:contains("space"), a:contains("planet"), a:contains("climate"), a:contains("galaxy"), a:contains("solar")'
    ).each((index, element) => {
      const titleMatch = $(element)
        .text()
        .trim()
        .match(/[^\n]*\n/);
      if (titleMatch && titleMatch[0].match(/space|planet/i)) {
        const title = titleMatch[0].slice(0, -1);
        const url = $(element).attr("href");

        articles.push({
          title,
          url,
          source: newspaper.name,
        });
      }
    });
  });
});

app.get("/", (req, res) => {
  res.json("Welcome to Planets API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:id", async (req, res) => {
  const newspaperId = req.params.id;

  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].address;

  console.log(newspaperAddress);

  axios.get(newspaperAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const specificArticles = [];

    $(
      'a:contains("star"), a:contains("astronomy"), a:contains("space"), a:contains("planet"), a:contains("climate"), a:contains("galaxy"), a:contains("solar")'
    ).each((index, element) => {
      const titleMatch = $(element)
        .text()
        .trim()
        .match(/[^\n]*\n/);
      if (titleMatch && titleMatch[0].match(/space|planet/i)) {
        const title = titleMatch[0].slice(0, -1);
        const url = $(element).attr("href");

        specificArticles.push({
          title,
          url,
        });
      }
    });
    res.json(specificArticles);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
