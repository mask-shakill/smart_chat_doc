"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Send, Upload, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onFileUpload: (file: File) => Promise<void>;
  isLoading: boolean;
  isUploading: boolean;
}

export function ChatInput({
  onSendMessage,
  onFileUpload,
  isLoading,
  isUploading,
}: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    await onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
    // Reset the input value so the same file can be uploaded again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t bg-white dark:bg-gray-900">
      <div className="flex w-full gap-2 items-center">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.txt"
        />
        <div className="relative group">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            aria-label="Upload document"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </button>
          <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg text-sm text-gray-600 dark:text-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            Upload document (.pdf, .txt)
          </div>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            className="w-full px-4 py-2 pr-12 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim()}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
