import React, { useEffect, useState } from 'react';
import supabase from './supabas';

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

function Loader() {
  return <p className="message">Loading Data...</p>;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: '40px' }}>{count} </span>
      <button className="btn btn-large" onClick={() => setCount(c => c + 1)}>
        +
      </button>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*');

        if (currCategory !== 'all') query = query.eq('category', currCategory);

        const { data: facts, error } = await query
          .order('category', { ascending: true })
          .limit(500);
        // console.log(error);
        // console.log(facts);
        if (!error) setFacts(facts);
        else alert('There is a problem getting Data!');
        setIsLoading(false);
      }
      getFacts();
    },
    [currCategory]
  );

  return (
    <div>
      <Header show={show} setShow={setShow} />
      {show && <NewFactForm setFacts={setFacts} setShow={setShow} />}
      <main className="main">
        <CategoryFilter setCurrCategory={setCurrCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </div>
  );
}

function Header({ show, setShow }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/img/logo.png" alt="logo" />
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

function NewFactForm({ setFacts, setShow }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);

    if (text && isValidUrl(source) && category && text.length <= 500) {
      // const newFact = {
      //   id: Math.round(Math.random() * 100000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //upload fact to database
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      //add the new fact to the UI
      if (!error) setFacts(facts => [newFact[0], ...facts]);

      setText('');
      setSource('');
      setCategory('');

      setShow(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{500 - textLength}</span>
      <input
        rel="noopener noreferrer"
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={e => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose a Category:</option>

        {CATEGORIES.map(cat => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all"
            onClick={() => setCurrCategory('all')}
          >
            All
          </button>
        </li>
        {CATEGORIES.map(cat => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-sub"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrCategory(cat.name)}
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

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No fact for this category yet! Create the first one 😊
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map(fact => (
          <Fact fact={fact} key={fact.id} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own! </p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  async function handleVote() {
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ votesInteresting: fact.votesInteresting + 1 })
      .eq('id', fact.id)
      .select();

    if (!error)
      setFacts(facts =>
        facts.map(f => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

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
        <button onClick={handleVote}>👍{fact.votesInteresting} </button>
        <button>🤯 {fact.votesMindblowing} </button>
        <button>⛔️ {fact.votesFalse} </button>
      </div>
    </li>
  );
}
