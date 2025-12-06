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

          let content = '';
          try {

          const url = require(`../posts/economia/${post.markdownPath}`);
          const res = await fetch(url);
          const text = await res.text();
          } catch (err) {
            console.warn(`No se pudo cargar ${post.markdownPath}`, err);
          }
       return {
            ...post,
            content,
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
      <section className='economia-news container mt-5'>
     <h1 className='mb-4'>Economia</h1>

     <div className='row'>
      {posts.map((post) => (
      <div className='col-md-6 col-lg-4 mb-4' key={post.id}>
      <div className='card h-100 shadow-sm'> 
      {post.image && (
     <img
     src={post.image}
    className="card-img-top"
    alt={post.title}
    style={{ height: '200px', objectFit: 'cover' }}

     />
      )}

    <div className='card-body d-flex flex-column'>
    <h5 className='card-title'>{post.title}</h5>
    <p className='text-muted small mb-2'>
     <i className="bi bi-calendar3"></i> {post.date}
    </p>
        
        
  <p className="card-text flex-grow-1">{post.description}</p>
                  {/* Opcional: enlace para leer más */}
                  <a href={`/economia/${post.slug}`} className="btn btn-outline-primary mt-auto">
                    Leer más →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Economia;

