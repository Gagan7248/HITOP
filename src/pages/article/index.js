import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {getArticleById} from '../../lib/supabase';

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    async function loadArticle() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, []);

  if (loading) {
    return (
      <Layout title="Loading Article">
        <main className="container margin-vert--lg">
          <p>Loading article...</p>
        </main>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout title="Article Not Found">
        <main className="container margin-vert--lg">
          <h1>Article Not Found</h1>

          <p>
            The requested article could not be found.
          </p>

          <Link to="/">
            ← Back to Home
          </Link>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={article.title}
      description={article.content?.slice(0, 160)}
    >
      <main className="container margin-vert--lg">

        <article>

          <div className="hitop-article-category">
            {article.category}
          </div>

          <h1>{article.title}</h1>

          <div className="hitop-article-meta">

            <span>
              {new Date(
                article.updated_at || article.created_at
              ).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>

            <span>·</span>

            <span>{article.type}</span>

          </div>

          <hr />

          <div
            className="hitop-article-body"
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.8',
            }}
          >
            {article.content}
          </div>

        </article>

      </main>
    </Layout>
  );
}