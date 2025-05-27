import * as React from "react";
const AlertList = ({ alerts }) => {
    if (!alerts.length) return <p>No alerts set</p>;
  
    return alerts.map((alert, i) => (
      <div key={i}>
        {alert.coinId} → ${alert.targetPrice}
        {alert.triggered && <span style={{ color: "green" }}> ✓ Triggered</span>}
      </div>
    ));
  };
  
  export default AlertList;
  