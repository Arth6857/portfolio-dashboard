const express = require("express");
const cors = require("cors");

const readPortfolioExcel = require("./excelService");
const { getCMP, getGoogleData } = require("./financeService");

const app = express();
app.use(cors());

app.get("/api/portfolio", async (req, res) => {
  try {
    const stocks = readPortfolioExcel();
    const enriched = [];

    for (const s of stocks) {
      if (!s.symbol) {
        console.log("Skipping:", s.name);
        continue;
      }

      const cmp = await getCMP(s.symbol);
      const google = await getGoogleData(s.symbol);

      const investment = s.purchasePrice * s.qty;
      const presentValue = cmp * s.qty;
      const gainLoss = presentValue - investment;

      enriched.push({
        ...s,
        cmp,
        peRatio: google.peRatio,
        earnings: google.earnings,
        investment,
        presentValue,
        gainLoss,
      });

      await new Promise(r => setTimeout(r, 700)); // rate control
    }

    res.json(enriched);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

app.listen(5050, () => console.log("Server running on port 5050"));