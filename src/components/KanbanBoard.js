import React, { useState, useEffect } from 'react';
import GroupSelector from './GroupSelector';
import SortSelector from './SortSelector';
import DisplaySelector from './DisplaySelector';

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'Not Set';
  }
};

const getUserCircleColor = (user) => {
  const colors = ['red', 'orange', 'blue', 'purple'];
  const userIndex = user?.id?.split("-")[1] % colors.length; 
  return colors[userIndex] || 'grey'; // Fallback color
};


const getStatusDot = (isAvailable) => (isAvailable ? 'green' : 'white');

// UserCircle Component
const UserCircle = ({ user, isAvailable }) => (
  <div className="user-circle">
    <div className="circle" style={{ backgroundColor: getUserCircleColor(user) }}>
      <span>{user.name.charAt(0)}</span>
    </div>
    <div className={`status-dot ${getStatusDot(isAvailable)}`}></div>
  </div>
);

const KanbanBoard = ({ tickets, users }) => {

  const savedGroupBy = localStorage.getItem('groupBy') || 'userId'; // Default to user grouping
  const savedSortBy = localStorage.getItem('sortBy') || 'priority';

  const [groupBy, setGroupBy] = useState(savedGroupBy);
  const [sortBy, setSortBy] = useState(savedSortBy);

  // Save state to localStorage whenever groupBy or sortBy changes
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  // Grouping tickets based on `groupBy` state
  const groupedTickets = tickets.reduce((acc, ticket) => {
    let key;

    // Determine the grouping key
    if (groupBy === 'userId') {
      key = users.find((user) => user.id === ticket.userId)?.name || 'Unknown User';
    } else if (groupBy === 'status') {
      key = ticket.status || 'No Status';
    } else if (groupBy === 'priority') {
      key = getPriorityLabel(ticket.priority);
    } else {
      key = 'Others';
    }

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sorting tickets in each group
  for (let group in groupedTickets) {
    groupedTickets[group].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }

  return (
    <div>
      <div className="kanban-header">
       
        <DisplaySelector groupBy={groupBy} sortBy={sortBy} setGroupBy={setGroupBy} setSortBy={setSortBy} />
      </div>
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((key) => (
          <Column
            key={key}
            title={key}
            tickets={groupedTickets[key]}
            groupBy={groupBy}
            users={users}
            sortBy={sortBy}
          />
        ))}
      </div>
    </div>
  );
};

const Column = ({ title, tickets, groupBy, users, sortBy }) => {
  const displayPriorityInTitle = groupBy === 'priority';

  return (
    <div className="kanban-column">
      <h2 className="column-title">
        {/* Display Group Title */}
        {groupBy === 'priority' ? (
          <div className="priority-label">{title}</div>
        ) : groupBy === 'userId' ? (
          <UserCircle
            user={users.find((user) => user.name === title)}
            isAvailable={users.find((user) => user.name === title)?.available}
          />
        ) : null}

        {/* Display the title and ticket length on the same row */}
        <span className="title-text">
          {groupBy !== 'priority' && title} {tickets.length}
        </span>
      </h2>

      {/* Render each ticket in the column */}
      {tickets.map((ticket) => {
        const user = users.find((user) => user.id === ticket.userId);
        const userStatus = user ? user.available : false;

        return (
          <div className="ticket" key={ticket.id}>
            {(groupBy === 'status' || groupBy === 'priority') && user && (
              <UserCircle user={user} isAvailable={userStatus} />
            )}
            <div className="ticket-content">
            <div className="ticket-id">
                {ticket.id}
              </div>
              <h3>{ticket.title}</h3>

          
             

              {ticket.tag && (
                <div className="tags">
                  <span className="grey-dot">●</span>
                  <span className="grey-dots">⋯</span>
                  {ticket.tag.map((tag, index) => (
                    <span key={index} style={{ color: 'grey' }}>{tag}</span>
                  ))}
                  
                </div>
              )}

              {!displayPriorityInTitle && groupBy === 'priority' && (
                <div className="priority-label">
                  {getPriorityLabel(ticket.priority)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};



export default KanbanBoard;
