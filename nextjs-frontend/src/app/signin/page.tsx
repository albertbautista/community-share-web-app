"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from "../../services/api";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setIsError(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!username || !password) {
      setIsError(true);
      setStatus("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const data = await signIn({ username, password });
      login(data.access, username);
      router.push("/");
    } catch (error) {
      setIsError(true);
      setStatus(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="layout">
        <div className="box">
          <div className="box-header">Sign In</div>
          <div className="box-content" style={{ maxWidth: "500px", margin: "0 auto" }}>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #9db3d1",
                    borderRadius: "3px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #9db3d1",
                    borderRadius: "3px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                style={{ width: "100%", textAlign: "center" }}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "#3b6db0", textDecoration: "underline" }}>
                Sign up here
              </Link>
            </p>

            {status ? (
              <p style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: isError ? "#fdd" : "#efe",
                border: `1px solid ${isError ? "#fbb" : "#bfb"}`,
                borderRadius: "3px",
                fontSize: "14px",
              }}>
                {status}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}