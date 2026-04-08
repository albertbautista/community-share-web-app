"use client";

import { useState } from "react";

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    pay: "",
    description: "",
    contact: "",
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
      category: "",
      location: "",
      pay: "",
      description: "",
      contact: "",
    });
  }

  return (
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
                  htmlFor="category"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
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
                  <option value="Plumbing">Plumbing</option>
                  <option value="Yard Work">Yard Work</option>
                  <option value="Painting">Furniture assembly</option>
                  <option value="Assembly">Yard Work</option>
                  <option value="Cleaning">Painting</option>
                  <option value="Tutoring">General Maintenance</option>

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
                  htmlFor="pay"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Pay
                </label>
                <input
                  type="text"
                  id="pay"
                  name="pay"
                  value={formData.pay}
                  onChange={handleChange}
                  placeholder="Example: $80 or $20/hour"
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
                  htmlFor="description"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
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

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="contact"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Contact Information
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Phone number or email"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #9db2cf",
                    fontSize: "1rem",
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
  );
}