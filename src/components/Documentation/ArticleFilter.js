import React, {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/articles.json')
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => {
        console.error('Failed to load articles:', error);
      });
  }, []);

  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const category = params.get('category');
  const type = params.get('type');

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (category) {
      result = result.filter(
        (article) =>
          article.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (type) {
      result = result.filter(
        (article) =>
          article.type?.toLowerCase() === type.toLowerCase(),
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((article) =>
        [
          article.title,
          article.description,
          article.category,
          article.type,
          article.tag,
        ]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(query),
          ),
      );
    }

    return result;
  }, [articles, category, type, search]);

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '20px',
      }}>

      {/* Search */}
      <div style={{marginBottom: '30px'}}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documentation..."
          style={{
            width: '100%',
            padding: '14px 18px',
            fontSize: '16px',
            borderRadius: '8px',
            border:
              '1px solid var(--ifm-color-emphasis-300)',
            background:
              'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Article List */}
      <div>
        {filteredArticles.map((article) => (
          <Link
            key={article.link}
            to={article.link}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}>

            <article
              style={{
                padding: '20px 0',
                borderBottom:
                  '1px solid var(--ifm-color-emphasis-200)',
              }}>

              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: '22px',
                  fontWeight: 600,
                }}>
                {article.title}
              </h2>

              {article.description && (
                <p
                  style={{
                    margin: '0 0 10px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color:
                      'var(--ifm-color-emphasis-700)',
                  }}>
                  {article.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontSize: '13px',
                  color:
                    'var(--ifm-color-emphasis-600)',
                }}>

                {article.category && (
                  <span>{article.category}</span>
                )}

                {article.type && (
                  <span>• {article.type}</span>
                )}

                {article.tag && (
                  <span>• {article.tag}</span>
                )}

                {article.date && (
                  <span>• {article.date}</span>
                )}

              </div>

            </article>

          </Link>
        ))}

        {articles.length === 0 && (
          <p>Loading articles...</p>
        )}

        {articles.length > 0 &&
          filteredArticles.length === 0 && (
            <p
              style={{
                padding: '40px 0',
                textAlign: 'center',
              }}>
              No articles found.
            </p>
          )}
      </div>
    </section>
  );
}