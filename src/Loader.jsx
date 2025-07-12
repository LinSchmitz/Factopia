import React from 'react';

export function Loader() {
  return (
    // <p className="message">
    <div className="loader">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="loader_item" style={{ '--i': i + 1 }}></div>
      ))}
    </div>
    // </p>
  );
}
