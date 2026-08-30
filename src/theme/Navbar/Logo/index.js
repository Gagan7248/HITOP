import React from 'react';
import Link from '@docusaurus/Link';

export default function NavbarLogo() {
  return (
    <Link
      to="/"
      className="navbar__brand"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
      }}>

      {/* Shield Logo */}
      <svg
        width="34"
        height="38"
        viewBox="0 0 48 54"
        xmlns="http://www.w3.org/2000/svg"
        style={{marginRight: '9px', flexShrink: 0}}>

        {/* Shield */}
        <path
          d="M24 2
             L44 9
             V25
             C44 38 36 47 24 52
             C12 47 4 38 4 25
             V9
             Z"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Check mark */}
        <path
          d="M14 27
             L21 34
             L35 19"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* HITOP Text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.1,
        }}>

        <span
          className="navbar__title"
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
          }}>
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