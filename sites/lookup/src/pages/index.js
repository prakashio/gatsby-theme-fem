import React from 'react';
import { Link } from 'gatsby';

const Index = () => (
  <>
    <h1>Rock & Morty character lookup</h1>
    <p>
      Look up your favorite characters from <em>Rock & Morty</em> using the{' '}
      <a href="https://rickandmortyapi.com">Rick and Morty API</a>
    </p>
    <Link to="/search">Search</Link>
  </>
);

export default Index;
