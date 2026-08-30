import React from 'react';
import DocSidebar from '@theme/DocSidebar';

export default function Sidebar(props) {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname
      : '';

  const hideSidebar =
    pathname.startsWith('/docs') ||
    pathname.startsWith('/troubleshooting');

  if (hideSidebar) {
    return null;
  }

  return <DocSidebar {...props} />;
}