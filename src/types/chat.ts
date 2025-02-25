export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Document {
  id: string;
  name: string;
}

export interface ChatResponse {
  response: string;
  document_reference?: string;
}

export interface ApiError {
  detail:
    | string
    | {
        error: string;
        file_size?: string;
        max_allowed?: string;
        filename?: string;
      };
}
