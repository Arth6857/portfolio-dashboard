# 📊 Portfolio Dashboard (Full Stack)

A real-time stock portfolio dashboard that reads Excel data and fetches live market prices.

## 🚀 Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS

Backend:
- Node.js
- Express
- XLSX
- Axios

APIs:
- Yahoo Finance (CMP)
- Screener.in (PE, EPS scraping)

---

## 📁 Project Structure

client → Next.js UI  
server → Express API  
portfolio.xlsx → stock data source

---

## ⚙️ Run Locally

### Backend

cd server
npm install
node index.js

Runs on:
http://localhost:5050/api/portfolio

---

### Frontend

cd client
npm install
npm run dev

Runs on:
http://localhost:3000

---

## 📊 Features

- Excel-based portfolio ingestion
- Live CMP fetch
- PE & EPS scraping
- Gain/Loss auto calculation
- Sector-wise portfolio tracking
- Real-time refresh

---

## 🧠 Future Improvements

- Add caching
- Add authentication
- Add charts
- Deploy to cloud
