// src/Pages/Economia.jsx
import React, { useEffect, useState } from 'react';
import Inicio from '../inicio';
import Menu from '../menu/menu';
import ReactMarkdown from 'react-markdown';
import  Economianews  from '../data/economiaData';

function Economia() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts(){
      const loadedPosts = await Promise.all(
        Economianews.map(async(post)=> {

          const url = require(`../posts/economia/${post.markdownPath}`);
          const res = await fetch(url);
          const text = await res.text();

       return {
            ...post,
            content: text,
          };
        })
      );

      setPosts(loadedPosts);
    }

    loadPosts();
  }, []);
    

  return (
    <div className="App">
      <Inicio />
      <Menu />

      {/* Muestra los posts si quieres */}
      {posts.map((p) => (
        <div key={p.slug}>
          <h2>{p.slug}</h2>
          <p>{p.description}</p>
          <ReactMarkdown>{p.content}</ReactMarkdown>
        </div>
      ))}

    </div>
  );
}

export default Economia;

