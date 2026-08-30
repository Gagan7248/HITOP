import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import ArticleFilter from '@site/src/components/Documentation/ArticleFilter';
import styles from './styles.module.css';

const subTabs = [
  {label: 'Home', type: null},
  {label: 'Tutorials', type: 'Tutorials'},
  {label: 'How-to', type: 'How-to'},
  {label: 'Reference', type: 'Reference'},
  {label: 'Explanation', type: 'Explanation'},
];

function DocumentationSubNav() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const currentCategory = params.get('category');
  const currentType = params.get('type');

  const createTabUrl = (type) => {
    const search = new URLSearchParams();

    if (currentCategory) {
      search.set('category', currentCategory);
    }

    if (type) {
      search.set('type', type);
    }

    const query = search.toString();

    return `/docs/intro${query ? `?${query}` : ''}`;
  };

  return (
    <div className="docSubNav">
      {subTabs.map((tab) => {
        const isActive =
          tab.type === currentType ||
          (!tab.type && !currentType);

        return (
          <Link
            key={tab.label}
            to={createTabUrl(tab.type)}
            style={{
              color: isActive ? '#1d4ed8' : '#374151',
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
              borderBottom: isActive
                ? '2px solid #1d4ed8'
                : '2px solid transparent',
              paddingBottom: '4px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}) {
  const sidebar = useDocsSidebar();
  const location = useLocation();

  const isDocumentation = location.pathname.startsWith('/docs');

  const params = new URLSearchParams(location.search);

  const category = params.get('category');
  const type = params.get('type');

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
        {isDocumentation && <DocumentationSubNav />}

        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer &&
              styles.docItemWrapperEnhanced,
          )}>
          
          {children}

          {isDocumentation && (
            <ArticleFilter
              category={category}
              type={type}
            />
          )}
        </div>
      </div>
    </main>
  );
}