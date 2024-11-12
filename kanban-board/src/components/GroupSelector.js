import React from 'react';

const GroupSelector = ({ groupBy, setGroupBy }) => (
  <div>
    <label>Group By: </label>
    <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
      <option value="userId">User</option>
      <option value="status">Status</option>
      <option value="priority">Priority</option>
    </select>
  </div>
);

export default GroupSelector;
