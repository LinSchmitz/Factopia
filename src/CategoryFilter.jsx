import React from 'react';
import { CATEGORIES } from './App';

export function CategoryFilter({ setCurrCategory }) {
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
