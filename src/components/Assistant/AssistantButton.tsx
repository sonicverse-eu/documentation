import { Icon } from '@mintlify/components';
import { toggleAssistant } from './events';

export function AssistantButton() {
  return (
    <button
      onClick={toggleAssistant}
      type="button"
      className="flex items-center justify-center gap-1.5 pl-3 pr-3.5 h-9 rounded-md bg-white/90 ring-1 ring-[rgba(16,18,20,0.12)] hover:ring-[rgba(181,31,46,0.35)] transition-all"
      aria-label="Toggle AI Assistant"
    >
      <Icon
        icon="sparkles"
        iconLibrary="lucide"
        size={16}
        color="currentColor"
        className="shrink-0 text-(--primary)"
      />
      <span className="text-sm text-[rgba(16,18,20,0.62)] whitespace-nowrap">
        Ask AI
      </span>
    </button>
  );
}
