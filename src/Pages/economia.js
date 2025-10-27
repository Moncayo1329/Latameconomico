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
          <p>Cargando posts...</p>
        ) : (
          posts.map((post) => {
            // Mostramos solo las primeras ~200 letras como preview
            const preview = post.content.split('\n').slice(0, 5).join(' ').slice(0, 200) + '...';

            return (
              <article key={post.path} className="mb-10 border-b pb-4">
                <ReactMarkdown>{preview}</ReactMarkdown>
                <Link
                  to={`/economia/${post.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Leer más →
                </Link>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Economia;

