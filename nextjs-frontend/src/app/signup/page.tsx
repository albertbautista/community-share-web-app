"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signUp } from "../../services/api";

export default function SignUpPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!username || !email || !password) {
      setStatus("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await signUp({ username, email, password });
      setStatus("Account created successfully. Redirecting to sign in...");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
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
          <div className="box-header">Sign Up</div>
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
                  Email
                </label>
                <input
                  name="email"
                  type="email"
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
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
              Already have an account?{" "}
              <Link href="/signin" style={{ color: "#3b6db0", textDecoration: "underline" }}>
                Sign in here
              </Link>
            </p>

            {status ? (
              <p style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: status.includes("error") || status.includes("Error") ? "#fdd" : "#efe",
                border: `1px solid ${status.includes("error") || status.includes("Error") ? "#fbb" : "#bfb"}`,
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
