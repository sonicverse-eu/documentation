export function AssistantEmptyState() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mt-4 flex flex-col items-center text-sm">
        <div className="mx-8 text-center text-[rgba(16,18,20,0.42)] text-xs">
          Responses are generated using AI and may contain mistakes.
        </div>
      </div>
    </div>
  );
}
