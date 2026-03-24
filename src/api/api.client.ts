import ky, { HTTPError } from "ky";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: BodyInit | null;
  accessToken?: string;
  includeCredentials?: boolean;
}

export class ApiError extends Error {
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
});

export function buildQueryString(
  query?: Record<string, string | number | undefined>,
) {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function normalizeQueryArrayValue(value?: string | string[]) {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value.join(",") : value;
}

export async function request<T>(path: string, options: RequestOptions = {}) {
  const headers: Record<string, string> = {};

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  if (options.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  try {
    return await apiClient(path.replace(/^\//, ""), {
      method: options.method ?? "GET",
      headers,
      body: options.body,
      credentials: options.includeCredentials ? "include" : "same-origin",
    }).json<T>();
  } catch (error) {
    if (error instanceof HTTPError) {
      const fallbackMessage = `${error.response.status} ${error.response.statusText}`;

      try {
        const errorBody = (await error.response.clone().json()) as {
          message?: string;
        };

        throw new ApiError(
          errorBody.message ?? fallbackMessage,
          error.response.status,
        );
      } catch (parsingError) {
        if (parsingError instanceof ApiError) {
          throw parsingError;
        }

        throw new ApiError(fallbackMessage, error.response.status);
      }
    }

    if (error instanceof Error) {
      throw new ApiError(error.message);
    }

    throw new ApiError("Не удалось выполнить запрос");
  }
}
