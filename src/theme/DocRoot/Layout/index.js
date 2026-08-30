import React, {useState} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import styles from './styles.module.css';

export default function DocRootLayout({children}) {
  const sidebar = useDocsSidebar();
  const location = useLocation();

  const [hiddenSidebarContainer, setHiddenSidebarContainer] =
    useState(false);

  const hideSidebar =
    location.pathname.startsWith('/docs') ||
    location.pathname.startsWith('/troubleshooting');

  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />

      <div className={styles.docRoot}>
        {sidebar && !hideSidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}

        <DocRootLayoutMain
          hiddenSidebarContainer={
            hiddenSidebarContainer || hideSidebar
          }>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}