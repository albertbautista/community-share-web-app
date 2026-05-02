"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { getAllPosts, Post } from "@/services/api";

const categories = [
  "All",
  "Plumbing",
  "Electrical",
  "Painting",
  "Yard Work",
  "Furniture Assembly",
  "General Maintenance",
  "Other",
];

export default function BrowseJobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobs, setJobs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getAllPosts()
      .then((data) => {
        if (!active) return;
        setJobs(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Unable to load jobs.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      jobs.filter((job) => {
        const matchesCategory = category === "All" || job.job_type === category;
        const matchesSearch =
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase()) ||
          job.content.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [jobs, search, category],
  );

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      <Navbar />

      <main style={{ padding: "30px 0" }}>
        <div style={{ width: "86%", margin: "0 auto" }}>

          {/* Header */}
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
                Browse Jobs
              </h1>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: "1.2rem", marginTop: 0 }}>
                Find neighborhood jobs posted by your community.
              </p>
            </div>
          </section>

          {/* Filters */}
          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #9db2cf",
              marginBottom: "28px",
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
                Filter Jobs
              </h2>
            </div>
            <div
              style={{
                padding: "20px",
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label
                  htmlFor="search"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, location, or keyword"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #9db2cf",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label
                  htmlFor="category"
                  style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #9db2cf",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Job Listings */}
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
                {filtered.length} Job{filtered.length !== 1 ? "s" : ""} Available
              </h2>
            </div>

            <div style={{ padding: "20px" }}>
              {loading ? (
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  Loading jobs...
                </p>
              ) : error ? (
                <p style={{ fontSize: "1rem", color: "#c0392b" }}>
                  {error}
                </p>
              ) : filtered.length === 0 ? (
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  No jobs match your search. Try adjusting your filters.
                </p>
              ) : (
                filtered.map((job, index) => (
                  <div
                    key={job.id}
                    style={{
                      border: "1px solid #9db2cf",
                      padding: "16px",
                      marginBottom: index < filtered.length - 1 ? "16px" : 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>
                        {job.title}
                      </h3>
                      <span
                        style={{
                          backgroundColor: "#dce7f5",
                          border: "1px solid #9db2cf",
                          padding: "2px 10px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {job.job_type}
                      </span>
                    </div>
                    <p style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "#444" }}>
                      {job.content}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "4px",
                        fontSize: "0.9rem",
                        color: "#666",
                      }}
                    >
                      <span>Location: {job.location}</span>
                      <span>Posted by {job.author.username}: {formatDate(job.created_at)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
