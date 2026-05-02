const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = body?.error || response.statusText || "Request failed";
    throw new Error(String(error));
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
