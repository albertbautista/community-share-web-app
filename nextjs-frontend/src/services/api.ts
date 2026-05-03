const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("communityShareToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = body?.error || response.statusText || "Request failed";
    throw new Error(String(error));
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json();
}

export type RecentPost = {
  id: number;
  title: string;
  content: string;
  author: { username: string };
  created_at: string;
};

export type Post = RecentPost & {
  job_type: string;
  location: string;
};

export type PostInput = {
  title: string;
  job_type: string;
  location: string;
  content: string;
};

export type JobTypeCount = {
  job_type: string;
  count: number;
};

export type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export type SignInData = {
  username: string;
  password: string;
};

export const getRecentPosts = async (limit = 6): Promise<RecentPost[]> => {
  return apiFetch<RecentPost[]>(`/posts/recent?limit=${limit}`);
};

export const getAllPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>(`/posts/`);
};

export const getMyPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>(`/posts/my-posts`);
};

export const createPost = async (data: PostInput): Promise<Post> => {
  return apiFetch<Post>(`/posts/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePost = async (postId: number, data: PostInput): Promise<Post> => {
  return apiFetch<Post>(`/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePost = async (postId: number): Promise<void> => {
  return apiFetch<void>(`/posts/${postId}`, {
    method: "DELETE",
  });
};

export const getPopularJobTypes = async (
  limit = 6,
): Promise<JobTypeCount[]> => {
  return apiFetch<JobTypeCount[]>(`/posts/job-types/popular?limit=${limit}`);
};

export const signUp = async (data: SignUpData) => {
  return apiFetch<{ id: number; username: string }>("/users/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const signIn = async (data: SignInData) => {
  return apiFetch<{ access: string }>("/users/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
