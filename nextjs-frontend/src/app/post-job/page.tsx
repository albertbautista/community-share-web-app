"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { createPost, PostInput } from "@/services/api";

export default function PostPage() {
  const [formData, setFormData] = useState<PostInput>({
    title: "",
    job_type: "",
    location: "",
    content: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "30px 0" }}>
        <div style={{ width: "86%", margin: "0 auto" }}>
          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #9db2cf",
            }}
          >
            <div
              style={{
                backgroundColor: "#2f5e9e",
                padding: "16px",
                borderBottom: "1px solid #9db2cf",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Make a Post
              </h1>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: "1.2rem", marginTop: 0 }}>
                You must be logged in to post a job.
              </p>
              <p style={{ fontSize: "1.2rem" }}>
                <Link href="/signin" style={{ color: "#3b6db0", textDecoration: "underline" }}>
                  Sign in
                </Link>{" "}
                or{" "}
                <Link href="/signup" style={{ color: "#3b6db0", textDecoration: "underline" }}>
                  sign up
                </Link>{" "}
                to continue.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (!isAuthenticated) {
      setStatus("Please sign in before posting a job.");
      return;
    }

    setLoading(true);

    try {
      await createPost(formData);
      setSubmitted(true);
      setFormData({ title: "", job_type: "", location: "", content: "" });
      setStatus("Your job was posted successfully.");
      router.push("/my-jobs");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to submit job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main style={{ padding: "30px 0" }}>
        <div
          style={{
            width: "86%",
            margin: "0 auto",
          }}
        >
          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #9db2cf",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                backgroundColor: "#2f5e9e",
                padding: "16px",
                borderBottom: "1px solid #9db2cf",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Make a Post
              </h1>
            </div>

            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: "1.2rem", marginTop: 0 }}>
                Share a neighborhood job opportunity with your community.
              </p>
            </div>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #9db2cf",
            }}
          >
            <div
              style={{
                backgroundColor: "#dce7f5",
                padding: "16px",
                borderBottom: "1px solid #9db2cf",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
                Job Post Form
              </h2>
            </div>

            <div style={{ padding: "20px" }}>
              {status && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px",
                    backgroundColor: submitted ? "#e8f4ea" : "#ffe8e8",
                    border: `1px solid ${submitted ? "#9ac7a3" : "#e59b9b"}`,
                  }}
                >
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="title"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #9db2cf",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="job_type"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Category
                  </label>
                  <select
                    id="job_type"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #9db2cf",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Select a category</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="painting">Painting</option>
                    <option value="yard">Yard Work</option>
                    <option value="assembly">Furniture Assembly</option>
                    <option value="maintenance">General Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="location"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city or neighborhood"
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #9db2cf",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="content"
                    style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                  >
                    Description
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Describe the job details"
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #9db2cf",
                      fontSize: "1rem",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "#2f5e9e",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? "Posting..." : "Submit Post"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}