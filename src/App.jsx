import React, { useEffect, useState } from 'react';
import supabase from './supabas';
import { Social } from './Social';
import { Header } from './Header';
import { CategoryFilter } from './CategoryFilter';
import { FactList } from './FactList';
import { NewFactForm } from './NewFactForm';
import { Loader } from './Loader';

export const CATEGORIES = [
  { name: 'technology', color: '#aec6cf' }, // Pastel Blue-Green
  { name: 'science', color: '#c7d2fe' }, // Soft Pastel Green
  { name: 'finance', color: '#ddd6fe' }, // Light Coral Pastel
  { name: 'society', color: '#fdfd96' }, // Lemon Pastel Yellow
  { name: 'entertainment', color: '#ffb7ce' }, // Bubblegum Pink
  { name: 'health', color: '#b0e0e6' }, // Powder Blue
  { name: 'history', color: '#ffcccb' }, // Blush Pastel Red
  { name: 'news', color: '#dcbdfb' }, // Lavender Pastel Purple
];

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
        <div>
          <CategoryFilter setCurrCategory={setCurrCategory} />
          <div className="social-div">
            <Social />
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </div>
  );
}
