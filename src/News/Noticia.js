// src/Pages/NoticiaDetalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Economianews } from '../data/economiaData';
import Inicio from '../inicio';
import Menu from '../menu/menu';

function NoticiaDetalle() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const post = Economianews.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      setLoading(false);
      return;
    }

    fetch(require(`../posts/economia/${post.markdownPath}`))
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, post]);

  if (!post) return <div>Noticia no encontrada</div>;
  if (loading) return <div>Cargando...</div>;

  return (
    <div className="App">
      <Inicio />
      <Menu />

      <article className="container my-5">
        <div className="max-w-4xl mx-auto">
          <Link to="/economia" className="text-muted mb-4 d-inline-block">
            ← Volver
          </Link>

          <h1 className="display-4 fw-bold my-4">{post.title}</h1>
          <p className="text-muted fs-5 mb-5">{post.date}</p>

          {post.image && (
            <img src={post.image} alt={post.title} className="img-fluid rounded mb-5 w-100" style={{maxHeight: '400px', objectFit: 'cover'}} />
          )}
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <hr className="my-5" />
          <Link to="/economia" className="btn btn-outline-secondary">
            ← Todas las noticias
          </Link>
        </div>
      </article>
    </div>
  );
}

export default NoticiaDetalle;