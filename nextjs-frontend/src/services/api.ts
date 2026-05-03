const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {};

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

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

export type UserSummary = {
  username: string;
};

export type RecentPost = {
  id: number;
  title: string;
  content: string;
  author: UserSummary;
  created_at: string;
};

export type Post = RecentPost & {
  job_type: string;
  location: string;
  pay_rate: number | null;
  image: string | null;
  status: string;
  accepted_by: UserSummary | null;
  accepted_at: string | null;
};

export type PostInput = {
  title: string;
  job_type: string;
  location: string;
  pay_rate?: number | null;
  image?: File | null;
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

export const getPostById = async (postId: number): Promise<Post> => {
  return apiFetch<Post>(`/posts/${postId}`);
};

export const getMyPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>(`/posts/my-posts`);
};

export const getSavedPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>(`/posts/saved`);
};

export const createPost = async (data: PostInput): Promise<Post> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("job_type", data.job_type);
  formData.append("location", data.location);
  formData.append("content", data.content);

  if (data.pay_rate != null) {
    formData.append("pay_rate", String(data.pay_rate));
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  return apiFetch<Post>(`/posts/`, {
    method: "POST",
    body: formData,
  });
};

export const savePost = async (
  postId: number,
): Promise<{ saved: boolean; created: boolean }> => {
  return apiFetch<{ saved: boolean; created: boolean }>(`/posts/${postId}/save`, {
    method: "POST",
  });
};

export const unsavePost = async (postId: number): Promise<void> => {
  return apiFetch<void>(`/posts/${postId}/save`, {
    method: "DELETE",
  });
};

export const updatePost = async (postId: number, data: PostInput): Promise<Post> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("job_type", data.job_type);
  formData.append("location", data.location);
  formData.append("content", data.content);

  if (data.pay_rate != null) {
    formData.append("pay_rate", String(data.pay_rate));
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  return apiFetch<Post>(`/posts/${postId}`, {
    method: "PUT",
    body: formData,
  });
};

export const deletePost = async (postId: number): Promise<void> => {
  return apiFetch<void>(`/posts/${postId}`, {
    method: "DELETE",
  });
};

export const acceptPost = async (postId: number): Promise<Post> => {
  return apiFetch<Post>(`/posts/${postId}/accept`, {
    method: "POST",
  });
};

export const unacceptPost = async (postId: number): Promise<Post> => {
  return apiFetch<Post>(`/posts/${postId}/unaccept`, {
    method: "POST",
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
