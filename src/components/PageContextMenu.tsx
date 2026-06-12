import { useState } from 'react';
import { Icon, cn } from '@mintlify/components';
import {
  useContextualOptions,
  type ContextualOptionItem,
} from '../hooks/useContextualOptions';

type CopyState = 'idle' | 'copying' | 'copied' | 'error';

interface PageContextMenuProps {
  pathname: string;
  options?: string[];
  className?: string;
}

export function PageContextMenu({
  pathname,
  options: configOptions,
  className,
}: PageContextMenuProps) {
  const markdownPath = pathname === '/' ? '/index' : pathname;

  const { options } = useContextualOptions({
    pathname: markdownPath,
    options: configOptions,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  if (!options.length) return null;

  const handleAction = async (option: ContextualOptionItem) => {
    setIsOpen(false);
    if (option.id === 'copy') {
      setCopyState('copying');
      try {
        const result = await option.action();
        setCopyState(result === false ? 'error' : 'copied');
      } catch {
        setCopyState('error');
      }
      setTimeout(() => setCopyState('idle'), 2000);
    } else {
      option.action();
    }
  };

  const copyText =
    copyState === 'copying'
      ? 'Copying...'
      : copyState === 'copied'
        ? 'Copied!'
        : copyState === 'error'
          ? 'Error'
          : 'Copy page';

  const firstOption = options[0];

  return (
    <div className={cn('relative flex items-center shrink-0', className)}>
      <div className="flex items-stretch h-9 relative z-20">
        {firstOption && (
          <button
            className={cn(
              'rounded-l-md px-3 text-[rgba(16,18,20,0.72)] border border-[rgba(16,18,20,0.12)] bg-white/90 hover:bg-[rgba(16,18,20,0.035)] transition-colors h-full',
              options.length === 1 ? 'rounded-md' : 'border-r-0',
              copyState !== 'idle' && 'text-[rgba(16,18,20,0.6)]',
            )}
            onClick={() => void handleAction(firstOption)}
            disabled={copyState === 'copying'}
            aria-label={firstOption.title}
          >
            <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              {firstOption.icon && (
                <firstOption.icon className="w-4 h-4 text-[rgba(16,18,20,0.62)]" />
              )}
              <span>
                {firstOption.id === 'copy' ? copyText : firstOption.title}
              </span>
            </div>
          </button>
        )}
        {options.length > 1 && (
          <button
            className="rounded-r-md border border-[rgba(16,18,20,0.12)] bg-white/90 hover:bg-[rgba(16,18,20,0.035)] aspect-square h-full flex items-center justify-center transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="More actions"
          >
            <Icon
              icon="chevron-down"
              iconLibrary="lucide"
              size={16}
              color="currentColor"
              className={cn(
                'transition-transform text-[rgba(16,18,20,0.42)]',
                isOpen && 'rotate-180',
              )}
            />
          </button>
        )}
      </div>
      {isOpen && options.length > 1 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="rounded-md absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-auto min-w-[280px] sm:w-64 bg-white border border-[rgba(16,18,20,0.12)] shadow-[var(--shadow-soft)] z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => void handleAction(option)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[rgba(16,18,20,0.035)] text-left"
              >
                <div className="border border-[rgba(16,18,20,0.12)] rounded-md p-1.5">
                  {option.icon && (
                    <option.icon className="w-4 h-4 text-[rgba(16,18,20,0.56)]" />
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="text-sm font-medium text-[#101214] flex items-center gap-1">
                    {option.title}
                    {option.externalLink && (
                      <Icon
                        icon="arrow-up-right"
                        iconLibrary="lucide"
                        size={12}
                        color="currentColor"
                        className="text-[rgba(16,18,20,0.5)]"
                      />
                    )}
                  </div>
                  <div className="text-xs text-[rgba(16,18,20,0.56)] mt-0.5">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
