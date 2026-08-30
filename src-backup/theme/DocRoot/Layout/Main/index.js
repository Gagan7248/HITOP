import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const subTabs = [
  {label: 'Home', path: '/docs/intro'},
  {label: 'Tutorials', path: '/docs/intro'},
  {label: 'How-to', path: '/docs/intro'},
  {label: 'Reference', path: '/docs/intro'},
  {label: 'Explanation', path: '/docs/intro'},
];

function DocumentationSubNav() {
  const location = useLocation();
  return (
    <div className="docSubNav">
      {subTabs.map((tab) => {
        const isActive = location.pathname === tab.path && tab.label === 'Home';
        return (
          <Link
            key={tab.label}
            to={tab.path}
            style={{
              color: isActive ? '#1d4ed8' : '#374151',
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
              borderBottom: isActive ? '2px solid #1d4ed8' : '2px solid transparent',
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

export default function DocRootLayoutMain({hiddenSidebarContainer, children}) {
  const sidebar = useDocsSidebar();
  const location = useLocation();
  const isDocumentation = location.pathname.startsWith('/docs');

  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        {isDocumentation && <DocumentationSubNav />}
        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer && styles.docItemWrapperEnhanced,
          )}>
          {children}
        </div>
      </div>
    </main>
  );
}