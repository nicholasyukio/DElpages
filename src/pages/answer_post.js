import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MathJax from 'react-mathjax2';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import { Helmet } from 'react-helmet';
import { logEvent, saveDesiteEventInDB } from './tracking.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function PageList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
      // Carregar o arquivo JSON com as páginas
      axios.get('/filesIndex.json')
          .then(response => {
              setPages(response.data);
          })
          .catch(error => {
              console.error('Erro ao carregar o índice:', error);
          });
  }, []);

  return (
    <section className="section">
    <div className="content-container-single-column">
        <h1>Dúvidas respondidas de circuitos elétricos</h1>
        <ul>
            {pages.map(page => (
                <li key={page.number}>
                    {/* Gera o link para a página usando o nome do arquivo sem a extensão .md */}
                    <Link to={`/answer/${page.filename.replace('.md', '')}`}>
                        {page.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
    </section>
  );
}

export function FilteredPageList({ count }) {
  const [filteredPages, setFilteredPages] = useState([]);

  function getRandomNumbers(count) {
    const maxNumber = 999; // Máximo de 299 para sorteio
    const numbers = new Set();

    while (numbers.size < count) {
        const randomNum = Math.floor(Math.random() * (maxNumber + 1))
            .toString()
            .padStart(5, '0'); // Preenche com zeros à esquerda
        numbers.add(randomNum);
    }
    return Array.from(numbers);
  }

  const numbers = useMemo(() => getRandomNumbers(count), [count]);

  useEffect(() => {
      axios.get('/filesIndex.json')
          .then(response => {
              const allPages = response.data;

              const filtered = allPages.filter(page =>
                  numbers.includes(page.number.toString().padStart(5, '0'))
              );

              setFilteredPages(filtered);
          })
          .catch(error => {
              console.error('Erro ao carregar o índice:', error);
          });
  }, [numbers]);

  return (
      <div>
          <h1>Sugestões de outras explicações de circuitos elétricos:</h1>
          <ul>
              {filteredPages.map(page => (
                  <li key={page.number}>
                      <Link to={`/answer/${page.filename.replace('.md', '')}`}>
                          {page.title}
                      </Link>
                  </li>
              ))}
          </ul>
          <Link to={`/anslist`}>
          Lista de todas as explicações
          </Link>
          <h1>Conheça também a parte de aulas gratuitas do site Domínio Elétrico</h1>
          <p>Aqui no site Domínio Elétrico, você tem acesso a aulas avulsas sobre vários assuntos de circuitos elétricos. São aulas teóricas, aulas de exercícios resolvidos e também vídeos de experimentos em laboratório. São aulas avulsas, sem ordem definida, que servem como amostra do que você pode aprender no curso pago. Você pode acessar e assistir às aulas aqui no site, sem a interrupção de anúncios como no YouTube, com uma conta gratuita aqui no site.</p>
          <Link to={`/`}>
          Conhecer a parte de aulas gratuitas do site Domínio Elétrico
          </Link>
      </div>
  );
}

export function KnowCourseFromBlogButton({ buttonName }) {
  const handleClick = () => {
      // Push the data to the dataLayer when the button is clicked
      window.dataLayer.push({
          event: 'clickFromBlog', // Custom event name
          buttonName: 'clickFromBlog', // Custom event data, you can adjust this as needed
      });
      logEvent('ButtonClick', `${buttonName} clicked`);
      // saveDesiteEventInDB("blog_click", utmTags.v);
      // Redirect the user after pushing the data to GTM if needed
      window.location.href = '/direto-dominio-eletrico'; // Redirect to the form anchor
  };

  return (
      <button className="btn-inscricao" onClick={handleClick}>
          Conhecer o curso Domínio Elétrico
      </button>
  );
}

export const AnswerText = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    import(`../../public/posts/${postId}.md`)
      .then(res => fetch(res.default))
      .then(res => res.text())
      .then(text => {
        const { data, content } = matter(text);
        setMetadata(data);
        setContent(content);
      })
      .catch(err => console.log(err));
  }, [postId]);

  return (
    <section className="section">
    <div className="content-container-single-column">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Helmet>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content}
      </ReactMarkdown>
      <KnowCourseFromBlogButton buttonName="BlogButton" />
      <FilteredPageList count={10} />
    </div>
    </section>
  );
};
