import type { ChatResponse, ApiError } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendChatMessage(
  prompt: string,
  documentId?: string | null
): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      document_id: documentId,
    }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(
      typeof error.detail === "string" ? error.detail : error.detail.error
    );
  }

  return response.json();
}

export async function uploadFile(file: File): Promise<{ document_id: string }> {
  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(
      typeof error.detail === "string" ? error.detail : error.detail.error
    );
  }

  return response.json();
}
