import axios from "axios";

export const fetchPortfolio = async () => {
  const res = await axios.get("https://portfolio-dashboard-17ln.onrender.com/api/portfolio")
  return res.data;
};

//   const res = await axios.get("http://172.17.107.73:5050/api/portfolio");