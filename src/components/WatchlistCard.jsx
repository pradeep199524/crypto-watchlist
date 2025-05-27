import * as React from "react";

import { FaPlus } from "react-icons/fa";

const WatchlistCard = ({ coinWatchlistIdInput, setCoinWatchlistIdInput, handleAddToWatchlist }) => (
  <div className="card">
    <div className="card-section column">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaPlus size={20} color="#007bff" />
        <input
          type="text"
          placeholder="Coin ID (e.g. bitcoin)"
          value={coinWatchlistIdInput}
          onChange={(e) => setCoinWatchlistIdInput(e.target.value)}
        />
      </div>
      <button className="button-bottom-left" onClick={handleAddToWatchlist}>
        Add to Watchlist
      </button>
    </div>
  </div>
);

export default WatchlistCard;
