import React, {useState, useEffect} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Search, ChevronRight, ArrowUpDown} from 'lucide-react';

function ArticleCard({article}) {
  return (
    <Link
      to={article.link}
      className="flex items-center gap-5 p-4 border border-gray-200 rounded-xl mb-4 hover:shadow-md transition-shadow no-underline"
      style={{textDecoration: 'none'}}>
      <div className="w-32 h-24 rounded-lg flex-shrink-0 bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
        {article.category}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>📅 {article.date}</span>
          <span>·</span>
          <span className="text-blue-600 font-medium">{article.category}</span>
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
            {article.tag}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {article.description}
        </p>
      </div>
      <ChevronRight className="text-gray-400 flex-shrink-0" size={22} />
    </Link>
  );
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/articles.json', {cache: 'no-store'})
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()),
  );
  const sorted = sortOrder === 'newest' ? filtered : [...filtered].reverse();

  return (
    <Layout title="Home" description="HITOP - Hotel IT Operating Procedure">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search HITOP documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Latest Articles</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder('newest')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 ${
                sortOrder === 'newest'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500'
              }`}>
              <ArrowUpDown size={14} /> Newest First
            </button>
            <button
              onClick={() => setSortOrder('oldest')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                sortOrder === 'oldest'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500'
              }`}>
              Oldest First
            </button>
          </div>
        </div>

        <div>
          {sorted.length === 0 && (
            <p className="text-gray-400 text-sm">No articles yet.</p>
          )}
          {sorted.map((article, idx) => (
            <ArticleCard key={idx} article={article} />
          ))}
        </div>
      </main>
    </Layout>
  );
}