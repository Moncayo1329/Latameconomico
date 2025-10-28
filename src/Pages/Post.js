// src/Pages/Post.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Inicio from '../inicio';
import Menu from '../menu/menu';

function Post() {
  const { slug } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    import(`../posts/economia/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setContent('Error al cargar el artículo.');
      });
  }, [slug]);

  return (
    <div className="App">
      <Inicio />
      <Menu />

      <div className="p-2 max-w-3xl mx-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Post;
