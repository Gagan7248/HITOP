import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Search, ChevronRight, ArrowUpDown} from 'lucide-react';

function ArticleCard({article}) {
  return (
    <Link
      to={article.link}
      className="hitop-article-card"
      style={{textDecoration: 'none'}}>

      <div className="hitop-article-category">
        {article.category}
      </div>

      <div className="hitop-article-content">
        <h3>{article.title}</h3>

        <div className="hitop-article-meta">
          <span>
            📅 {article.date?.split('T')[0]}
          </span>

          <span>·</span>

          <span>{article.category}</span>

          {article.tag && (
            <span className="hitop-article-tag">
              {article.tag}
            </span>
          )}
        </div>

        {article.description && (
          <p>{article.description}</p>
        )}
      </div>

      <ChevronRight
        className="hitop-article-arrow"
        size={22}
      />
    </Link>
  );
}

export default function DocumentationPage() {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/articles.json', {cache: 'no-store'})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load articles.json');
        }

        return response.json();
      })
      .then((data) => {
        setArticles(
          Array.isArray(data)
            ? data.filter((article) => article.section === 'documentation')
            : [],
        );
      })
      .catch((error) => {
        console.error('Documentation loading error:', error);
        setArticles([]);
      });
  }, []);

  const filtered = articles.filter((article) => {
    const searchText = query.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      article.title?.toLowerCase().includes(searchText) ||
      article.description?.toLowerCase().includes(searchText) ||
      article.category?.toLowerCase().includes(searchText) ||
      article.type?.toLowerCase().includes(searchText) ||
      article.tag?.toLowerCase().includes(searchText)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const first = new Date(a.date).getTime();
    const second = new Date(b.date).getTime();

    return sortOrder === 'newest'
      ? second - first
      : first - second;
  });

  return (
    <Layout
      title="Documentation"
      description="HITOP Documentation">

      <main className="hitop-home">

        <div className="hitop-search-box">
          <Search size={20} />

          <input
            type="search"
            placeholder="Search Documentation..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="hitop-section-header">

          <h1>Documentation</h1>

          <div className="hitop-sort-buttons">

            <button
              className={sortOrder === 'newest' ? 'active' : ''}
              onClick={() => setSortOrder('newest')}>

              <ArrowUpDown size={15} />

              Newest First
            </button>

            <button
              className={sortOrder === 'oldest' ? 'active' : ''}
              onClick={() => setSortOrder('oldest')}>

              Oldest First
            </button>

          </div>

        </div>

        <div className="hitop-articles">

          {sorted.length === 0 ? (
            <p className="hitop-empty">
              No documentation articles found.
            </p>
          ) : (
            sorted.map((article) => (
              <ArticleCard
                key={`${article.link}-${article.date}`}
                article={article}
              />
            ))
          )}

        </div>

      </main>

    </Layout>
  );
}