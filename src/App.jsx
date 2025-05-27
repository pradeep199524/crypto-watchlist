import './styles.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

import AlertCard from './components/AlertCard';
import AlertList from './components/AlertList';
import CryptoList from './components/CryptoList';
import HeaderBar from './components/HeaderBar';
import WatchlistCard from './components/WatchlistCard';
const App = () => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      const parsed = saved ? JSON.parse(saved) : ["bitcoin", "ethereum"];
      return Array.isArray(parsed) ? parsed : ["bitcoin", "ethereum"];
    } catch {
      return ["bitcoin", "ethereum"];
    }
  });

  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem("alerts");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [cryptoData, setCryptoData] = useState([]);
  const [coinIdInput, setCoinIdInput] = useState("");
  const [coinWatchlistIdInput, setCoinWatchlistIdInput] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const fetchData = async () => {
    if (!watchlist.length) return;
    setIsLoading(true);
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: watchlist.join(","),
          order: "market_cap_desc",
        },
      });
      setCryptoData(res.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [watchlist]);

  useEffect(() => {
    const updated = alerts.map((alert) => {
      const coin = cryptoData.find((c) => c.id === alert.coinId);
      if (coin && !alert.triggered && coin.current_price >= alert.targetPrice) {
        notifyUser(coin, alert.targetPrice);
        return { ...alert, triggered: true };
      }
      return alert;
    });
    setAlerts(updated);
  }, [cryptoData]);

  const notifyUser = (coin, price) => {
    alert(`${coin.name} reached $${price}`);
    if (Notification.permission === "granted") {
      new Notification(`${coin.name} Alert`, {
        body: `${coin.name} has reached $${price}`,
        icon: coin.image,
      });
    }
  };

  const handleAddToWatchlist = () => {
    const id = coinWatchlistIdInput.trim().toLowerCase();
    if (!id || watchlist.includes(id)) return;
    setWatchlist((prev) => [...prev, id]);
    setCoinWatchlistIdInput("");
  };

  const handleSetAlert = () => {
    const id = coinIdInput.trim().toLowerCase();
    const price = parseFloat(targetPrice);
    if (!id || isNaN(price)) return;
    const exists = alerts.some((a) => a.coinId === id && a.targetPrice === price);
    if (exists) {
      alert("Alert already exists");
      return;
    }
    setAlerts((prev) => [...prev, { coinId: id, targetPrice: price, triggered: false }]);
    setCoinIdInput("");
    setTargetPrice("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crypto Watchlist & Alerts</h1>
      <HeaderBar fetchData={fetchData} isLoading={isLoading} lastUpdated={lastUpdated} />
      
      <div className="dashboard">
        <WatchlistCard
          coinWatchlistIdInput={coinWatchlistIdInput}
          setCoinWatchlistIdInput={setCoinWatchlistIdInput}
          handleAddToWatchlist={handleAddToWatchlist}
        />
        <AlertCard
          coinIdInput={coinIdInput}
          setCoinIdInput={setCoinIdInput}
          targetPrice={targetPrice}
          setTargetPrice={setTargetPrice}
          handleSetAlert={handleSetAlert}
        />
      </div>

      <h2>Watchlist</h2>
      <CryptoList cryptoData={cryptoData} alerts={alerts} />

      <h2>Alerts</h2>
      <AlertList alerts={alerts} />
    </div>
  );
};

export default App;
