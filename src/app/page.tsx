"use client";

import { useState } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { sendChatMessage, uploadFile } from "@/services/api";
import type { Message, Document } from "@/types/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(inputMessage, currentDocument?.id);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${errorMessage}`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (isUploading) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadFile(file);

      const newDocument: Document = {
        id: response.document_id,
        name: file.name,
      };

      setCurrentDocument(newDocument);

      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `File uploaded successfully: ${file.name}`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload file";
      setError(errorMessage);

      const errorResponse: Message = {
        id: Date.now().toString(),
        content: `Error uploading file: ${errorMessage}`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsUploading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentDocument(null);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-2 bg-white dark:bg-gray-900 border-b">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            AI Chat Assistant
          </span>
          <ThemeToggle />
        </div>

        <ChatHeader
          currentDocument={currentDocument}
          onRemoveDocument={() => setCurrentDocument(null)}
          onClearChat={clearChat}
          hasMessages={messages.length > 0}
          error={error}
        />

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <MessageList messages={messages} />
          </div>
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          isLoading={isLoading}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
}
