import React, { useState } from 'react';

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: 'technology', color: '#aec6cf' }, // Pastel Blue-Green
  { name: 'science', color: '#c7d2fe' }, // Soft Pastel Green
  { name: 'finance', color: '#ddd6fe' }, // Light Coral Pastel
  { name: 'society', color: '#fdfd96' }, // Lemon Pastel Yellow
  { name: 'entertainment', color: '#ffb7ce' }, // Bubblegum Pink
  { name: 'health', color: '#b0e0e6' }, // Powder Blue
  { name: 'history', color: '#ffcccb' }, // Blush Pastel Red
  { name: 'news', color: '#dcbdfb' }, // Lavender Pastel Purple
];

function Counter() {
  const [count, setCount] = useState(0);

  // function handleClick() {
  //   click => click + 1;
  //   setClick(click => click + 1);
  // }

  return (
    <div>
      <span style={{ fontSize: '40px' }}>{count} </span>
      <button className="btn btn-large" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <Counter />
      <NewFactForm />
      <main className="main">
        <CategoryFilter />
        <FactList />
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
  return <form className="fact-form">NewFactForm</form>;
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        {' '}
        <li className="category">
          <button className="btn btn-all">All</button>
        </li>
        {CATEGORIES.map(cat => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-sub"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
        {/* <li className="category">
          <button
            className="btn btn-sub"
            style={{ backgroundColor: '#aec6cf' }}
          >
            technology
          </button>
        </li> */}
      </ul>
    </aside>
  );
}

function FactList() {
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list" v>
        {facts.map(fact => (
          <Fact fact={fact} key={fact.id} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own! </p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(cat => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-button">
        <button>👍{fact.votesInteresting} </button>
        <button>🤯 {fact.votesMindblowing} </button>
        <button>⛔️ {fact.votesFalse} </button>
      </div>
    </li>
  );
}
