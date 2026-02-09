const XLSX = require("xlsx");

function readPortfolioExcel() {
  const workbook = XLSX.readFile("./portfolio.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  let sector = "";
  const stocks = [];

  const normalize = (text) =>
  text?.toString().toLowerCase().replace(/[^a-z]/g, "");

const tickerMap = {
  hdfcbank: "HDFCBANK.NS",
  bajajfinance: "BAJFINANCE.NS",
  icicibank: "ICICIBANK.NS",
  bajajhousing: "BAJAJHFL.NS",
  savanifinancials: "SAVANI.NS",
  affleindia: "AFFLE.NS",
  ltimindtree: "LTIM.NS",
  kpittech: "KPITTECH.NS",
  tatatech: "TATATECH.NS",
  blseservices: "BLSE.NS",
  tanla: "TANLA.NS",
  dmart: "DMART.NS",
  tataconsumer: "TATACONSUM.NS",
  pidilite: "PIDILITIND.NS",
  tatapower: "TATAPOWER.NS",
  suzlon: "SUZLON.NS",
  astral: "ASTRAL.NS",
  hariompipes: "HARIOMPIPE.NS",
  polycab: "POLYCAB.NS",
  cleanscience: "CLEAN.NS",
  deepaknitrite: "DEEPAKNTR.NS",
  fineorganic: "FINEORG.NS",
  gravita: "GRAVITA.NS",
  sbilife: "SBILIFE.NS",
  infy: "INFY.NS",
  happiestmind: "HAPPSTMNDS.NS",
  easemytrip: "EASEMYTRIP.NS"
};

  rows.forEach((row) => {
    const name = row[1];

    if (!name) return;

    // detect sector rows
    if (
      name.includes("Sector") ||
      name === "Consumer" ||
      name === "Power" ||
      name === "Others"
    ) {
      sector = name;
      return;
    }

    stocks.push({
  name,
  symbol: tickerMap[normalize(name)] || null,
  sector,
  purchasePrice: Number(row[2]) || 0,
  qty: Number(row[3]) || 0,
});
  });

  return stocks;
}

module.exports = readPortfolioExcel;