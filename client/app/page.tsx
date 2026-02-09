"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/api";

export default function Home() {
  const [stocks, setStocks] = useState<any[]>([]);

  const loadData = async () => {
    const data = await fetchPortfolio();
    setStocks(data);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>

      <table className="w-full border text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Stock</th>
            <th>Sector</th>
            <th>CMP</th>
            <th>Investment</th>
            <th>Present Value</th>
            <th>Gain/Loss</th>
            <th>PE</th>
            <th>Earnings</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.sector}</td>
              <td>{s.cmp}</td>
              <td>{s.investment}</td>
              <td>{s.presentValue}</td>

              <td className={s.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                {s.gainLoss}
              </td>

              <td>{s.peRatio}</td>
              <td>{s.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}