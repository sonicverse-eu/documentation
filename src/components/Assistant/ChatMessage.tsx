import * as React from 'react';
import type { UIMessage } from '@ai-sdk/react';
import { cn } from '@mintlify/components';

interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: UIMessage;
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, message, ...props }, ref) => {
    const content = message.parts
      .filter((p) => p.type === 'text')
      .map((p) => ('text' in p ? p.text : ''))
      .join('');

    return (
      <div className="flex justify-end items-end w-full flex-col gap-2">
        <div
          ref={ref}
          className={cn(
            'flex px-3 py-2 items-start gap-4 w-fit rounded-md bg-[rgba(16,18,20,0.055)]',
            className,
          )}
          {...props}
        >
          <div className="flex items-start gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <div className="wrap-break-word hyphens-auto text-base lg:text-sm text-[#101214]">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = 'ChatMessage';
