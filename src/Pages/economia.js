// src/Pages/Economia.jsx
import React, { useEffect, useState } from 'react';
import Inicio from '../inicio';
import Menu from '../menu/menu';
import ReactMarkdown from 'react-markdown';

function Economia() {
  const [posts, setPosts] = useState([]); // [{ path: string, content: string }]

  useEffect(() => {
    // Ajusta la ruta si tu archivo está en otra carpeta
    // Este require.context busca en src/posts/economia/*.md
    const mdContext = require.context('../posts/economia', false, /\.md$/);

    const keys = mdContext.keys(); // ej: ['./noticia1.md', './noticia2.md']

    // Convertimos cada key en su URL (mdContext(key)) y hacemos fetch para obtener texto
    Promise.all(
      keys.map(async (key) => {
        const mdUrl = mdContext(key); // normalmente es una URL al asset
        try {
          const res = await fetch(mdUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
          const text = await res.text();
          return { path: key, content: text };
        } catch (err) {
          console.error('Error cargando markdown:', mdUrl, err);
          return { path: key, content: `ERROR: no se pudo cargar ${key}` };
        }
      })
    )
      .then((loaded) => {
        // opcional: ordenar por nombre o por front-matter si parseas metadata
        setPosts(loaded);
      })
      .catch((err) => console.error('Error Promise.all md fetch:', err));
  }, []);

  return (
    <div className="App">
      <Inicio />
      <Menu />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Economía</h1>

        {posts.length === 0 ? (
          <p>Cargando posts...</p>
        ) : (
          posts.map((post) => (
            <article key={post.path} className="mb-10 border-b pb-4">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Economia;

