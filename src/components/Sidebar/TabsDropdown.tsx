import { useState } from 'react';
import { cn, Icon } from '@mintlify/components';
import type { TabInfo } from '@mintlify/astro/helpers';

interface TabsDropdownProps {
  tabs: TabInfo[];
}

export function TabsDropdown({ tabs }: TabsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeTab = tabs.find((tab) => tab.isActive);

  if (tabs.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-2.5 h-10 rounded-md border border-[rgba(16,18,20,0.12)] hover:bg-[rgba(16,18,20,0.045)] gap-1.5"
      >
        <span className="text-base font-normal text-[#101214]">
          {activeTab?.name || tabs[0]?.name}
        </span>
        <Icon
          icon="chevron-down"
          iconLibrary="lucide"
          className={cn('transition-transform', isOpen && 'rotate-180')}
          size={16}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[rgba(16,18,20,0.12)] rounded-md shadow-[var(--shadow-soft)] p-1.5 z-20">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={cn(
                  'flex items-center justify-between px-2.5 py-2 text-sm font-medium rounded-md hover:bg-[rgba(16,18,20,0.045)]',
                  tab.isActive ? 'text-primary' : 'text-[#101214]',
                )}
                onClick={() => setIsOpen(false)}
              >
                {tab.name}
                {tab.isActive && (
                  <Icon
                    icon="check"
                    iconLibrary="lucide"
                    className="text-primary"
                    size={16}
                  />
                )}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
