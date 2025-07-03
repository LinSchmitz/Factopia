import React, { useState } from 'react';
import { CATEGORIES } from './App';
import supabase from './supabas';

export function NewFactForm({ setFacts, setShow }) {
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
