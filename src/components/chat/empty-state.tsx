import { Bot } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Bot className="h-12 w-12 text-blue-500 mb-4 opacity-20" />
      <h3 className="text-xl font-medium mb-2">Welcome to AI Chat Assistant</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        Ask questions, upload documents, and get intelligent responses based on
        your content.
      </p>
    </div>
  );
}
