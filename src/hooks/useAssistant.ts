import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useEffect, useRef, useState } from 'react';
import useMessagesStore from './useMessagesStore';

const SUBDOMAIN = import.meta.env.PUBLIC_MINTLIFY_SUBDOMAIN;
const API_KEY = import.meta.env.PUBLIC_MINTLIFY_ASSISTANT_KEY;
const ASSISTANT_CONFIG_ERROR =
  'Mintlify AI chat is not configured. Set PUBLIC_MINTLIFY_SUBDOMAIN.';

export const useAssistant = () => {
  const isClearedRef = useRef(false);
  const [input, setInput] = useState('');
  const isConfigured = Boolean(SUBDOMAIN);

  const { threadId, setThreadId, setThreadKey, setError, error } =
    useMessagesStore();

  const {
    messages,
    sendMessage,
    status,
    setMessages,
    stop,
    clearError,
    error: chatError,
  } = useChat({
    id: `assistant-${SUBDOMAIN || 'unconfigured'}`,
    transport: new DefaultChatTransport({
      api: `https://api.mintlify.com/discovery/v2/assistant/${SUBDOMAIN}/message`,
      headers: {
        ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
      },
      prepareSendMessagesRequest: ({ messages }) => {
        const storedKey = sessionStorage.getItem('assistant-threadKey');
        const storedId = sessionStorage.getItem('assistant-threadId');

        return {
          body: {
            messages,
            fp: 'anonymous',
            retrievalPageSize: 5,
            context: [],
            ...(storedId && { threadId: storedId }),
            ...(storedKey && { threadKey: storedKey }),
          },
        };
      },
      fetch: async (url, options) => {
        if (!isConfigured) {
          throw new Error(ASSISTANT_CONFIG_ERROR);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          const message =
            response.status === 401 || response.status === 403
              ? 'Mintlify AI chat authentication failed. Check PUBLIC_MINTLIFY_ASSISTANT_KEY.'
              : `Mintlify AI chat request failed (${response.status}).`;
          throw new Error(message);
        }

        const tempThreadId = response.headers.get('x-thread-id');
        const tempThreadKey = response.headers.get('x-thread-key');

        if (tempThreadId && !isClearedRef.current) {
          setThreadId(tempThreadId);
          sessionStorage.setItem('assistant-threadId', tempThreadId);
        }
        if (tempThreadKey && !isClearedRef.current) {
          setThreadKey(tempThreadKey);
          sessionStorage.setItem('assistant-threadKey', tempThreadKey);
        }

        return response;
      },
    }),
    onError: (error) => {
      setError(error.message || 'Mintlify AI chat request failed.');
    },
  });

  useEffect(() => {
    const storedId = sessionStorage.getItem('assistant-threadId');
    const storedKey = sessionStorage.getItem('assistant-threadKey');

    if (storedId) setThreadId(storedId);
    if (storedKey) setThreadKey(storedKey);
  }, [setThreadId, setThreadKey]);

  useEffect(() => {
    useMessagesStore.setState({ messages });
  }, [messages]);

  useEffect(() => {
    useMessagesStore.setState({ status });
  }, [status]);

  useEffect(() => {
    if (!isConfigured) {
      setError(ASSISTANT_CONFIG_ERROR);
    }
  }, [isConfigured, setError]);

  useEffect(() => {
    if (chatError) {
      setError(chatError.message || 'Mintlify AI chat request failed.');
    }
  }, [chatError, setError]);

  const isLoading = status === 'streaming' || status === 'submitted';

  const onClear = useCallback(() => {
    isClearedRef.current = true;
    stop();
    clearError();
    setMessages([]);
    setInput('');
    setThreadId(undefined);
    setThreadKey(undefined);
    sessionStorage.removeItem('assistant-threadKey');
    sessionStorage.removeItem('assistant-threadId');
    useMessagesStore.setState({
      messages: [],
      error: isConfigured ? undefined : ASSISTANT_CONFIG_ERROR,
    });
  }, [
    isConfigured,
    stop,
    clearError,
    setMessages,
    setThreadId,
    setThreadKey,
  ]);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || status !== 'ready') return;
    if (!isConfigured) {
      setError(ASSISTANT_CONFIG_ERROR);
      return;
    }
    isClearedRef.current = false;
    clearError();
    setError(undefined);
    sendMessage({ text: input });
    setInput('');
  }, [input, status, isConfigured, clearError, setError, sendMessage]);

  return {
    input,
    status,
    handleSubmit,
    setInput,
    messages,
    setMessages,
    isLoading,
    onClear,
    stop,
    threadId,
    error,
  };
};
