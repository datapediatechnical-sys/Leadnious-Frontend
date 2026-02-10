/**
 * API Client for Lead Genius Backend
 * Handles all HTTP requests with authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiError {
    detail: string;
    status: number;
}

interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
}

/**
 * Get the access token from localStorage
 */
function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
}

/**
 * Make an authenticated API request
 */
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const token = getAccessToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Request failed' }));
            return {
                error: {
                    detail: errorData.detail || `HTTP Error ${response.status}`,
                    status: response.status,
                },
            };
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return { data: undefined as T };
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        return {
            error: {
                detail: error instanceof Error ? error.message : 'Network error',
                status: 0,
            },
        };
    }
}

/**
 * API methods for common HTTP verbs
 */
export const api = {
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, body?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T>(endpoint: string, body?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),

    /**
     * Special method for OAuth2 form data (login endpoint)
     */
    postForm: async <T>(endpoint: string, formData: Record<string, string>): Promise<ApiResponse<T>> => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Request failed' }));
                return {
                    error: {
                        detail: errorData.detail || `HTTP Error ${response.status}`,
                        status: response.status,
                    },
                };
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            return {
                error: {
                    detail: error instanceof Error ? error.message : 'Network error',
                    status: 0,
                },
            };
        }
    },
};

export { API_BASE_URL };
