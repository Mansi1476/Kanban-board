import React, { useState } from 'react';
import GroupSelector from './GroupSelector';
import SortSelector from './SortSelector';

const DisplaySelector = ({ groupBy, sortBy, setGroupBy, setSortBy }) => {
  const [showCard, setShowCard] = useState(false);

  const toggleCardVisibility = () => {
    setShowCard((prev) => !prev);
  };

  const hideCard = () => {
    setShowCard(false);
  };

  return (
    <div className="display-container">
      <button className="display-button" onClick={toggleCardVisibility}>
        <span className="filter-icon">⚙️</span> Display
      </button>

      {showCard && (
        <div className="selectors-card" onMouseLeave={hideCard}>
          <div className="selectors">
            <div className="selector-item">
              <span>Grouping:</span>
              <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
            </div>
            <div className="selector-item">
              <span>Ordering:</span>
              <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplaySelector;
