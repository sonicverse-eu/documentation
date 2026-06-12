import type { UIMessage } from '@ai-sdk/react';
import { create } from 'zustand';

interface MessagesState {
  messages: UIMessage[];
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  error: string | undefined;
  threadId: string | undefined;
  threadKey: string | undefined;
  setError: (error: string | undefined) => void;
  setThreadId: (threadId: string | undefined) => void;
  setThreadKey: (key: string | undefined) => void;
}

const useMessagesStore = create<MessagesState>((set) => ({
  status: 'ready',
  error: undefined,
  messages: [],
  threadId: undefined,
  threadKey: undefined,
  setError: (error) => set({ error }),
  setThreadId: (threadId) => set({ threadId }),
  setThreadKey: (threadKey) => set({ threadKey }),
}));

export default useMessagesStore;
