import React from 'react';

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
          <h1>Factopia</h1>
        </div>
        <button className="btn btn-large btn-open">Share a fact</button>
      </header>
    </div>
  );
}
