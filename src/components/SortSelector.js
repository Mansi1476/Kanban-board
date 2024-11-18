import React from 'react';

const SortSelector = ({ sortBy, setSortBy }) => (
  <div>
    <label>Sort By: </label>
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  </div>
);

export default SortSelector;
