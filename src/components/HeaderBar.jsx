import { FaSyncAlt } from "react-icons/fa";
import * as React from "react";

const HeaderBar = ({ fetchData, isLoading, lastUpdated }) => (
  <div className="card-section">
    <FaSyncAlt size={20} color="#ffc107" />
    <button onClick={fetchData} disabled={isLoading}>
      {isLoading ? "Refreshing..." : "Manual Refresh"}
    </button>
    {lastUpdated && (
      <span className="last-updated">⏳ Last updated at: {lastUpdated}</span>
    )}
  </div>
);

export default HeaderBar;
