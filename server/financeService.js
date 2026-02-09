const axios = require("axios");
const cheerio = require("cheerio");

/* ================= CMP FROM YAHOO ================= */

async function getCMP(symbol) {
  try {
    if (!symbol) return 0;

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const price =
      res.data?.chart?.result?.[0]?.meta?.regularMarketPrice;

    if (!price) {
      console.log("No price:", symbol);
      return 0;
    }

    return price;
  } catch (err) {
    console.log("CMP failed:", symbol);
    return 0;
  }
}

/* ================= PE & EPS FROM SCREENER ================= */

const screenerSlugMap = {
  HDFCBANK: "HDFCBANK",
  BAJFINANCE: "BAJFINANCE",
  ICICIBANK: "ICICIBANK",
  BAJAJHFL: "BAJAJHFL",
  AFFLE: "AFFLE",
  KPITTECH: "KPITTECH",
  TATATECH: "TATATECH",
  BLSE: "BLSE",
  DMART: "DMART",
  TATACONSUM: "TATACONSUM",
  PIDILITIND: "PIDILITIND",
  TATAPOWER: "TATAPOWER",
  SUZLON: "SUZLON",
  ASTRAL: "ASTRAL",
  POLYCAB: "POLYCAB",
  CLEAN: "CLEAN",
  DEEPAKNTR: "DEEPAKNTR",
  FINEORG: "FINEORG",
  GRAVITA: "GRAVITA",
  SBILIFE: "SBILIFE",
  INFY: "INFY",
  EASEMYTRIP: "EASEMYTRIP"
};

async function getGoogleData(symbol) {
  try {
    if (!symbol) return { peRatio: "-", earnings: "-" };

    const clean = symbol.replace(".NS", "");
    const slug = screenerSlugMap[clean];

    if (!slug) {
      return { peRatio: "-", earnings: "-" };
    }

    const url = `https://www.screener.in/company/${slug}/`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(data);

    let peRatio = "-";
    let earnings = "-";

    $(".company-ratios li").each((i, el) => {
      const text = $(el).text();

      if (text.includes("P/E")) {
        peRatio = $(el).find("span").last().text().trim();
      }

      if (text.includes("EPS")) {
        earnings = $(el).find("span").last().text().trim();
      }
    });

    return { peRatio, earnings };
  } catch (err) {
    console.log("Screener failed:", symbol);
    return { peRatio: "-", earnings: "-" };
  }
}

module.exports = { getCMP, getGoogleData };