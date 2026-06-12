import { Icon } from '@mintlify/components';
import { openSearch } from './SearchBar';
import { toggleAssistant } from './Assistant/events';

export function MobileActionButtons() {
  return (
    <div className="flex lg:hidden items-center gap-2">
      <button
        type="button"
        className="text-[rgba(16,18,20,0.58)] w-8 h-8 flex items-center justify-center rounded-md hover:bg-[rgba(16,18,20,0.045)] hover:text-[#101214]"
        onClick={openSearch}
        aria-label="Search"
      >
        <Icon icon="search" iconLibrary="lucide" size={16} color="currentColor" />
      </button>
      <button
        type="button"
        className="text-[rgba(16,18,20,0.58)] w-8 h-8 flex items-center justify-center rounded-md hover:bg-[rgba(16,18,20,0.045)] hover:text-[#101214]"
        onClick={toggleAssistant}
        aria-label="AI Assistant"
      >
        <Icon icon="sparkles" iconLibrary="lucide" size={16} color="currentColor" />
      </button>
    </div>
  );
}

export function MobileNavToggle({
  pageTitle,
  groupName,
}: {
  pageTitle: string;
  groupName?: string;
}) {
  const handleToggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
  };

  return (
    <button
      type="button"
      className="flex items-center h-14 py-4 lg:px-[5vw] lg:hidden focus:outline-0 w-full text-left"
      onClick={handleToggle}
    >
      <div className="flex items-center text-[rgba(16,18,20,0.58)] hover:text-[#101214]">
        <span className="sr-only">Navigation</span>
        <Icon icon="menu" iconLibrary="lucide" size={18} />
      </div>
      <div className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3 overflow-hidden">
        {groupName && (
          <div className="flex items-center space-x-3 shrink-0">
            <span>{groupName}</span>
            <Icon
              icon="chevron-right"
              iconLibrary="lucide"
              size={16}
              className="text-[rgba(16,18,20,0.36)]"
            />
          </div>
        )}
        <div className="font-semibold text-[#101214] truncate min-w-0 flex-1">
          {pageTitle}
        </div>
      </div>
    </button>
  );
}
