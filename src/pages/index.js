import React, {useEffect, useState} from 'react';
import {getPublishedArticles} from '../lib/supabase';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Search, ChevronRight, ArrowUpDown} from 'lucide-react';

function ArticleCard({article}) {
  return (
    <Link
      to={`/article?id=${encodeURIComponent(article.id)}`}
      className="hitop-article-card"
      style={{textDecoration: 'none'}}>

      <div className="hitop-article-category">
        {article.category}
      </div>

      {article.image && (
        <div className="hitop-article-image">
          <img src={article.image} alt={article.title} />
        </div>
      )}

      <div className="hitop-article-content">
        <h3>{article.title}</h3>

        <div className="hitop-article-meta">
          <span>📅 {article.date.split('T')[0]}</span>
          <span>·</span>
          <span>{article.category}</span>
          <span className="hitop-article-tag">
            {article.tag}
          </span>
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

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 10;
  const MORE_SIZE = 20;

  async function loadArticles(limit, currentOffset, replace = false) {
    if (loading) return;

    setLoading(true);

    try {
      const supabaseArticles = await getPublishedArticles(
        limit,
        currentOffset
      );

      const cmsArticles = supabaseArticles.map((article) => ({
        id: article.id,
        title: article.title,
        category: article.category || 'General',
        type: article.type || '',
        tag: article.type || '',
        description: '',
        date: article.updated_at || article.created_at,
        image: '',
        section: article.section || '',
        link: `/article?id=${article.id}`,
      }));

      if (replace) {
        setArticles(cmsArticles);
      } else {
        setArticles((previous) => [
          ...previous,
          ...cmsArticles,
        ]);
      }

      setHasMore(supabaseArticles.length === limit);
      setOffset(currentOffset + limit);
    } catch (error) {
      console.error('HITOP article loading error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles(PAGE_SIZE, 0, true);
  }, []);

  const filtered = articles.filter((article) => {
    const searchText = query.toLowerCase();

    return (
      article.title?.toLowerCase().includes(searchText) ||
      article.description?.toLowerCase().includes(searchText) ||
      article.category?.toLowerCase().includes(searchText) ||
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

  function handleSearch(event) {
    setQuery(event.target.value);
  }

  function handleSort(order) {
    setSortOrder(order);
  }

  function handleViewMore() {
    loadArticles(MORE_SIZE, offset);
  }

  return (
    <Layout
      title="Home"
      description="HITOP - Hotel IT Operating Procedure">

      <main className="hitop-home">

        <div className="hitop-search-box">
          <Search size={20} />

          <input
            type="search"
            placeholder="Search HITOP documents..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="hitop-section-header">
          <h1>Latest Articles</h1>

          <div className="hitop-sort-buttons">

            <button
              className={sortOrder === 'newest' ? 'active' : ''}
              onClick={() => handleSort('newest')}>

              <ArrowUpDown size={15} />

              Newest First
            </button>

            <button
              className={sortOrder === 'oldest' ? 'active' : ''}
              onClick={() => handleSort('oldest')}>

              Oldest First
            </button>

          </div>
        </div>

        <div className="hitop-articles">

          {sorted.length === 0 ? (
            <p className="hitop-empty">
              No articles found.
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

        {hasMore && (
          <div className="hitop-view-more">
            <button
              onClick={handleViewMore}
              disabled={loading}>
              {loading ? 'Loading...' : 'View More'}
            </button>
          </div>
        )}

      </main>

    </Layout>
  );
}