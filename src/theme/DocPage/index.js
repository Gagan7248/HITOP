import React from 'react';
import DocItem from '@theme/DocItem';
import DocSidebar from '@theme/DocSidebar';
import {useLocation} from '@docusaurus/router';

export default function DocPage(props) {
  const location = useLocation();

  const isDocumentation = location.pathname.startsWith('/docs');
  const isTroubleshooting =
    location.pathname.startsWith('/troubleshooting');

  const hideSidebar = isDocumentation || isTroubleshooting;

  return (
    <div className="row">
      {!hideSidebar && (
        <aside className="col col--3">
          <DocSidebar />
        </aside>
      )}

      <main
        className={
          hideSidebar
            ? 'col col--12'
            : 'col col--9'
        }>
        <DocItem {...props} />
      </main>
    </div>
  );
}