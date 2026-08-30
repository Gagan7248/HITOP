import React from 'react';
import Layout from '@theme/Layout';
import ArticleFilter from '@site/src/components/Documentation/ArticleFilter';

export default function Documentation() {
  return (
    <Layout title="Documentation">
      <main className="container margin-vert--lg">
        <h1>Documentation</h1>
        <ArticleFilter />
      </main>
    </Layout>
  );
}