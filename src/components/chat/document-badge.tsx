import { FileText, X } from "lucide-react";
import type { Document } from "@/types/chat";

interface DocumentBadgeProps {
  document: Document;
  onRemove: () => void;
}

export function DocumentBadge({ document, onRemove }: DocumentBadgeProps) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        <FileText className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{document.name}</span>
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 h-4 w-4 rounded-full p-0 inline-flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Remove document"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
