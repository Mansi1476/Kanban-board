import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch tickets and users from API
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app-container">
      <h1>Kanban Board</h1>
      <KanbanBoard 
        tickets={tickets} 
        users={users} 
        groupBy={groupBy} 
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default App;
