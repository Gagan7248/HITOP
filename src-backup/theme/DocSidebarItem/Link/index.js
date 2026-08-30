import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';

import {
  Settings,
  Network,
  Shield,
  Monitor,
  Calendar,
  CreditCard,
  MonitorSmartphone,
  Mail,
  Server,
  Grid3x3,
  Cloud,
  Users,
  Building2,
} from 'lucide-react';

const categoryIcons = {
  'IT Operations': Settings,
  'Networking': Network,
  'Security': Shield,
  'Hardware': Monitor,
  'PMS': Calendar,
  'POS': CreditCard,
  'Windows': MonitorSmartphone,
  'Email': Mail,
  'Servers': Server,
  'Applications': Grid3x3,
  'Backup & Recovery': Cloud,
  'User Management': Users,
  'Infrastructure': Building2,
};

function LinkLabel({label}) {
  const IconComponent = categoryIcons[label];
  return (
    <span
      className={styles.linkLabel}
      style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      {IconComponent && <IconComponent size={16} strokeWidth={2} />}
      {label}
    </span>
  );
}
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {href, label, className, autoAddBaseUrl} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <LinkLabel label={label} />
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
