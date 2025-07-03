import React from 'react';

export function Header({ show, setShow }) {
  return (
    <header className="header">
      <div className="logo">
        <button className="btn btn-logo"></button>
        {/* <img src="/img/logo.png" alt="logo" /> */}
        <h1>Factopia</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShow(show => !show)}
      >
        {show ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}
