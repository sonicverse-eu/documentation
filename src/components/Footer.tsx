import type { NavPage } from '@mintlify/astro/helpers';
import { Icon } from '@mintlify/components';

interface FooterProps {
  prev: NavPage | null;
  next: NavPage | null;
}

export default function Footer({ prev, next }: FooterProps) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-[rgba(16,18,20,0.08)] pt-8">
      {prev ? (
        <a
          href={prev.href}
          className="group flex items-center gap-1.5 text-sm font-medium text-[rgba(16,18,20,0.56)] no-underline! hover:text-[#101214] transition-colors duration-150"
        >
          <Icon
            icon="chevron-left"
            iconLibrary="lucide"
            color="currentColor"
            size={16}
            className="shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5"
          />
          {prev.title}
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a
          href={next.href}
          className="group flex items-center gap-1.5 text-sm font-medium text-[rgba(16,18,20,0.56)] no-underline! hover:text-[#101214] transition-colors duration-150"
        >
          {next.title}
          <Icon
            icon="chevron-right"
            iconLibrary="lucide"
            color="currentColor"
            size={16}
            className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
