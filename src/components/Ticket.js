import React from 'react';

const Ticket = ({ ticket }) => {
  const priorityLevels = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];
  return (
    <div className="ticket">
      <h3>{ticket.title}{ticket.length}</h3>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {priorityLevels[ticket.priority]}</p>
    </div>
  );
};

export default Ticket;
