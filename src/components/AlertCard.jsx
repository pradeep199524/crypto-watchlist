import * as React from "react";

import { FaPlus, FaBell } from "react-icons/fa";

const AlertCard = ({ coinIdInput, setCoinIdInput, targetPrice, setTargetPrice, handleSetAlert }) => (
  <div className="card">
    <div className="card-section">
      <FaPlus size={20} color="#007bff" />
      <input
        type="text"
        placeholder="Coin ID (e.g. bitcoin)"
        value={coinIdInput}
        onChange={(e) => setCoinIdInput(e.target.value)}
      />
    </div>

    <div className="card-section">
      <FaBell size={20} color="#28a745" />
      <input
        type="number"
        placeholder="Target Price"
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
      />
    </div>

    <button onClick={handleSetAlert}>Set Alert</button>
  </div>
);

export default AlertCard;
