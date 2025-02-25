import { Trash, Info } from "lucide-react";
import { DocumentBadge } from "./document-badge";
import type { Document } from "@/types/chat";

interface ChatHeaderProps {
  currentDocument: Document | null;
  onRemoveDocument: () => void;
  onClearChat: () => void;
  hasMessages: boolean;
  error: string | null;
}

export function ChatHeader({
  currentDocument,
  onRemoveDocument,
  onClearChat,
  hasMessages,
  error,
}: ChatHeaderProps) {
  return (
    <div className="border-b bg-white dark:bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            AI Chat Assistant
          </h1>
          {currentDocument && (
            <DocumentBadge
              document={currentDocument}
              onRemove={onRemoveDocument}
            />
          )}
        </div>
        <div className="relative group">
          <button
            type="button"
            onClick={onClearChat}
            disabled={!hasMessages}
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Clear conversation"
          >
            <Trash className="h-4 w-4" />
          </button>
          <div className="absolute right-0 top-full mt-2 w-40 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg text-sm text-gray-600 dark:text-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            Clear conversation
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
          <div className="flex items-center gap-2 text-sm">
            <Info className="h-4 w-4" />
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
