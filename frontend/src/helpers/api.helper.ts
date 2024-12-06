import { AxiosError } from "axios";

export interface BackendError {
  message: string;
  code: number;
  description?: string;
}

export const getError = (error: AxiosError): BackendError => {
  console.error("API Error:", error);

  if (error.response?.data) {
    const { message, code, description } = error.response
      .data as Partial<BackendError>;

    return {
      message: message || "An error occurred",
      code: code || 500,
      description: description || "No further details available",
    };
  }

  return {
    message: "Unknown error occurred",
    code: 100,
    description: "-",
  };
};
