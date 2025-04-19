import React from 'react';

export default function FilterButtons({ setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter('All')}>All</button>
      <button onClick={() => setFilter('Completed')}>Completed</button>
      <button onClick={() => setFilter('Pending')}>Pending</button>
    </div>
  );
}