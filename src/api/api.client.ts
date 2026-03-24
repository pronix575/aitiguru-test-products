import ky from "ky";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: BodyInit | null;
  json?: unknown;
  accessToken?: string;
  includeCredentials?: boolean;
}

type RequestContext = {
  accessToken?: string;
};

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
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request, options) => {
        const context = options.context as RequestContext | undefined;

        if (context?.accessToken) {
          request.headers.set("Authorization", `Bearer ${context.accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.ok) {
          return response;
        }

        const fallbackMessage = `${response.status} ${response.statusText}`;

        try {
          const errorBody = (await response.clone().json()) as {
            message?: string;
          };

          throw new ApiError(errorBody.message ?? fallbackMessage, response.status);
        } catch (error) {
          if (error instanceof ApiError) {
            throw error;
          }

          throw new ApiError(fallbackMessage, response.status);
        }
      },
    ],
  },
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
  try {
    return await apiClient(path.replace(/^\//, ""), {
      method: options.method ?? "GET",
      body: options.body,
      json: options.json,
      credentials: options.includeCredentials ? "include" : "same-origin",
      context: {
        accessToken: options.accessToken,
      } satisfies RequestContext,
    }).json<T>();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(error.message);
    }

    throw new ApiError("Не удалось выполнить запрос");
  }
}
