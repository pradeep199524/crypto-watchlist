import * as React from "react";
const CryptoList = ({ cryptoData, alerts }) => {
    if (!cryptoData.length) return <p>No coins to display</p>;
  
    return cryptoData.map((coin) => {
      const alertTriggered = alerts.some(a => a.coinId === coin.id && a.triggered);
      return (
        <div
          key={coin.id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: alertTriggered ? "lightgreen" : "white",
          }}
        >
          <img src={coin.image} alt={coin.name} width={20} />
          <strong> {coin.name}</strong> – ${coin.current_price} (
          {coin.price_change_percentage_24h?.toFixed(2)}%)
        </div>
      );
    });
  };
  
  export default CryptoList;
  