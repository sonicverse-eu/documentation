import { cn, Icon } from '@mintlify/components';
import type { NavPage } from '@mintlify/astro/helpers';
import type { SidebarItemStyle } from './types';

export interface SideNavItemProps {
  page: NavPage;
  currentPath: string;
  sidebarItemStyle?: SidebarItemStyle;
}

const ACTIVE_TEXT = 'text-(--primary) font-medium';

const sidebarStyles: Record<
  SidebarItemStyle,
  { base?: string; active: string; inactive: string }
> = {
  container: {
    base: 'rounded-md w-full outline-offset-[-1px]',
    active: `bg-(--primary)/10 ${ACTIVE_TEXT}`,
    inactive:
      'hover:bg-[rgba(16,18,20,0.045)] text-[rgba(16,18,20,0.68)] hover:text-[#101214]',
  },
  card: {
    base: 'ml-4 border-l outline-offset-[-1px]',
    active: `border-(--primary) bg-(--primary)/10 ${ACTIVE_TEXT}`,
    inactive:
      'border-[rgba(16,18,20,0.06)] hover:bg-[rgba(16,18,20,0.045)] text-[rgba(16,18,20,0.68)] hover:text-[#101214]',
  },
  border: {
    base: 'ml-4 border-l py-2 lg:py-1.5 w-[calc(100%-1rem)]',
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive:
      'border-[rgba(16,18,20,0.06)] hover:border-[rgba(16,18,20,0.2)] text-[rgba(16,18,20,0.68)] hover:text-[#101214]',
  },
  undecorated: {
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive:
      'border-[rgba(16,18,20,0.06)] hover:border-[rgba(16,18,20,0.2)] text-[rgba(16,18,20,0.68)] hover:text-[#101214]',
  },
  arrow: {
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive:
      'border-[rgba(16,18,20,0.06)] hover:border-[rgba(16,18,20,0.2)] text-[rgba(16,18,20,0.68)] hover:text-[#101214]',
  },
  plain: {
    active: ACTIVE_TEXT,
    inactive: 'text-[#101214] hover:text-(--primary)',
  },
};

export function SideNavItem({
  page,
  currentPath,
  sidebarItemStyle = 'container',
}: SideNavItemProps) {
  const isActive = page.href === currentPath;
  const title = page.title;
  const isOneWord = title.split(' ').length === 1;
  const variant = sidebarStyles[sidebarItemStyle];

  return (
    <li className="relative scroll-m-4 first:scroll-m-20" data-title={title}>
      <a
        href={page.href}
        className={cn(
          'group flex items-center pl-4 pr-3 py-1.5 cursor-pointer gap-x-3 text-left',
          isOneWord && 'wrap-break-word hyphens-auto',
          variant.base,
          isActive ? variant.active : variant.inactive,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {sidebarItemStyle === 'arrow' && isActive && (
          <Icon
            icon="chevron-right"
            iconLibrary="lucide"
            className="absolute left-0 text-(--primary) group-hover:text-(--primary)"
            size={16}
          />
        )}
        {page.icon && (
          <span
            className={cn(
              'w-5 h-5 p-0.5 inline-flex items-center justify-center rounded',
              isActive ? 'bg-(--primary)' : 'bg-[rgba(16,18,20,0.36)]',
            )}
          >
            <Icon
              icon={page.icon}
              iconLibrary="lucide"
              className={cn(
                isActive ? 'bg-white' : 'bg-[rgba(16,18,20,0.6)] group-hover:bg-white',
              )}
              overrideColor
              size={12}
            />
          </span>
        )}
        <span className="flex-1 truncate min-w-0">{title}</span>
        {page.deprecated && (
          <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-md bg-[rgba(16,18,20,0.06)] text-[rgba(16,18,20,0.58)]">
            Deprecated
          </span>
        )}
      </a>
    </li>
  );
}
