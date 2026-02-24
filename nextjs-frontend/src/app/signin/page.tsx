"use client";

import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(mode.toUpperCase(), data);
    alert(mode === "signin" ? "Signed in (demo)" : "Signed up (demo)");
    e.currentTarget.reset();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {mode === "signin"
            ? "Enter your email and password."
            : "Create an account with your email and password."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-lg py-2 text-sm font-medium transition ${
              mode === "signin"
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-lg py-2 text-sm font-medium transition ${
              mode === "signup"
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </main>
    </div>
  );
}