import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {Search, ChevronRight, ArrowUpDown} from 'lucide-react';
import styles from './styles.module.css';

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

function ArticleListing({section, title, placeholder}) {
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
            ? data.filter((article) => article.section === section)
            : [],
        );
      })
      .catch((error) => {
        console.error(`${title} loading error:`, error);
        setArticles([]);
      });
  }, [section, title]);

  const filtered = articles.filter((article) => {
    const searchText = query.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return [
      article.title,
      article.description,
      article.category,
      article.type,
      article.tag,
    ]
      .filter(Boolean)
      .some((value) =>
        value.toLowerCase().includes(searchText),
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
    <main className="hitop-home">

      <div className="hitop-search-box">
        <Search size={20} />

        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="hitop-section-header">

        <h1>{title}</h1>

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
            {articles.length === 0
              ? 'Loading articles...'
              : `No ${section} articles found.`}
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
  );
}

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}) {
  const sidebar = useDocsSidebar();
  const location = useLocation();

  const pathname = location.pathname.replace(/\/+$/, '') || '/';

  /*
   * IMPORTANT:
   * /docs and /troubleshooting are listing pages.
   * Actual article pages such as /docs/it-operations/... 
   * must continue using the normal Docusaurus layout.
   */

  const isDocumentationHome = pathname === '/docs';
  const isTroubleshootingHome = pathname === '/troubleshooting';

  if (isDocumentationHome) {
    return (
      <main className={styles.listingPage}>
        <ArticleListing
          section="documentation"
          title="Documentation"
          placeholder="Search Documentation..."
        />
      </main>
    );
  }

  if (isTroubleshootingHome) {
    return (
      <main className={styles.listingPage}>
        <ArticleListing
          section="troubleshooting"
          title="Troubleshooting"
          placeholder="Search Troubleshooting..."
        />
      </main>
    );
  }

  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) &&
          styles.docMainContainerEnhanced,
      )}>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>

        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer &&
              styles.docItemWrapperEnhanced,
          )}>
          {children}
        </div>

      </div>

    </main>
  );
}