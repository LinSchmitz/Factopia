import React from 'react';

export default function App() {
  return (
    <div>
      <Header />
      <NewFactForm />
      <main class="main">
        <FactList />
        <CategoryFilter />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/img/logo.png" alt="logo" />
        <h1>Factopia</h1>
      </div>
      <button className="btn btn-large btn-open">Share a fact</button>
    </header>
  );
}

function NewFactForm() {
  return <form class="fact-form">NewFactForm</form>;
}

function CategoryFilter() {
  return <aside>CategoryFilter</aside>;
}

function FactList() {
  return <section>FactList</section>;
}
