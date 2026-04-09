"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    job_type: "",
    location: "",
    content: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Job Post Submitted:", formData);
    setSubmitted(true);

    setFormData({
      title: "",
      job_type: "",
      location: "",
      content: "",
    });
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
              {submitted && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px",
                    backgroundColor: "#e8f4ea",
                    border: "1px solid #9ac7a3",
                  }}
                >
                  Your job post was submitted successfully.
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
                  style={{
                    backgroundColor: "#2f5e9e",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Submit Post
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}