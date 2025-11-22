// src/Pages/Economia.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Inicio from '../inicio';
import Menu from '../menu/menu';
import ReactMarkdown from 'react-markdown';

function Economia() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const mdContext = require.context('../posts/economia', false, /\.md$/);
    const keys = mdContext.keys();

    Promise.all(
      keys.map(async (key) => {
        const mdUrl = mdContext(key);
        const res = await fetch(mdUrl);
        const text = await res.text();

        // Tomamos el nombre del archivo como "slug"
        const slug = key.replace('./', '').replace('.md', '');

        return { path: key, slug, content: text };
      })
    ).then(setPosts);
  }, []);

  return (
    <div className="App">
      <Inicio />
      <Menu />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Economía</h2>
       <hr  />
        {posts.length === 0 ? (
          <p>Cargando posts.</p>
        ) : (
          posts.map((post) => {
              const lines = post.content.split('\n').filter(line => line.trim() !== '');
  const title = lines[0]?.trim();        // primera línea → título
  const date = lines[1]?.trim();         // segunda línea → fecha
  const description = lines.slice(2).join(' ').slice(0, 250) + '...'; // resto → descripción

            return (
               <Link
                key={post.path}
                to={`/economia/${post.slug}`}
                className="block mb-7 border-b pb-4 hover:bg-gray-50 transition rounded-lg p-4"
              >
                <h3 className="text-2xl font-semibold mb-1 text-blue-700 hover:underline">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{date}</p>

      <div className="text-gray-700 leading-relaxed">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Economia;

