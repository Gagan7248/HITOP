import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo() {
  const logoUrl = useBaseUrl('img/logo.svg');

  return (
    <Link to="/" className="navbar__brand" style={{alignItems: 'center'}}>
      <img
        src={logoUrl}
        alt="HITOP Logo"
        className="navbar__logo"
        style={{height: '32px', marginRight: '8px'}}
      />
      <div style={{display: 'flex', flexDirection: 'column', lineHeight: 1.1}}>
        <span
          className="navbar__title"
          style={{fontWeight: 700, fontSize: '1.1rem'}}>
          HITOP
        </span>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            whiteSpace: 'nowrap',
          }}>
          Hotel IT Operating Procedure
        </span>
      </div>
    </Link>
  );
}
