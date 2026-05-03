"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getMyPosts, updatePost, deletePost, Post } from "@/services/api";

const jobTypes = [
  "plumbing",
  "electrical",
  "painting",
  "yard",
  "assembly",
  "maintenance",
  "other",
];

const jobTypeLabels: Record<string, string> = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  painting: "Painting",
  yard: "Yard Work",
  assembly: "Furniture Assembly",
  maintenance: "General Maintenance",
  other: "Other",
};

const formatJobType = (value: string) => jobTypeLabels[value.toLowerCase()] || value;

export default function MyJobsPage() {
  const { isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    job_type: "",
    location: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let active = true;
    getMyPosts()
      .then((data) => {
        if (!active) return;
        setJobs(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Unable to load your jobs.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleEditClick = (job: Post) => {
    setEditingId(job.id);
    setEditData({
      title: job.title,
      job_type: job.job_type || "",
      location: job.location || "",
      content: job.content || "",
    });
    setStatus(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ title: "", job_type: "", location: "", content: "" });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (jobId: number) => {
    setSaving(true);
    setStatus(null);

    try {
      const updated = await updatePost(jobId, editData);
      setJobs((prev) => prev.map((job) => (job.id === jobId ? updated : job)));
      setStatus("Job updated successfully.");
      handleCancelEdit();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save changes.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (jobId: number) => {
    if (!window.confirm("Delete this job? This cannot be undone.")) {
      return;
    }

    setDeletingId(jobId);
    setError(null);
    setStatus(null);

    try {
      await deletePost(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setStatus("Job deleted successfully.");
      if (editingId === jobId) {
        handleCancelEdit();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to delete job.";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

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
                  My Jobs
                </h1>
              </div>
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "1.2rem", marginTop: 0 }}>
                  You must be logged in to view and manage the jobs you created.
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

  return (
    <>
      <Navbar />
      <main style={{ padding: "30px 0" }}>
        <div style={{ width: "86%", margin: "0 auto" }}>
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
                My Jobs
              </h1>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: "1.2rem", marginTop: 0 }}>
                Manage the jobs you posted to the community. You can edit or delete any of your jobs at any time.
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
                Your Jobs
              </h2>
            </div>
            <div style={{ padding: "20px" }}>
              {status && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px",
                    backgroundColor: "#e8f4ea",
                    border: "1px solid #9ac7a3",
                  }}
                >
                  {status}
                </div>
              )}

              {error && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px",
                    backgroundColor: "#ffe8e8",
                    border: "1px solid #e59b9b",
                  }}
                >
                  {error}
                </div>
              )}

              {loading ? (
                <p style={{ fontSize: "1rem", color: "#555" }}>Loading your jobs...</p>
              ) : jobs.length === 0 ? (
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  You have not posted any jobs yet.
                </p>
              ) : (
                jobs.map((job, index) => (
                  <div
                    key={job.id}
                    style={{
                      border: "1px solid #9db2cf",
                      padding: "16px",
                      marginBottom: index < jobs.length - 1 ? "16px" : 0,
                    }}
                  >
                    {editingId === job.id ? (
                      <div>
                        <div style={{ marginBottom: "14px" }}>
                          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                            Job Title
                          </label>
                          <input
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #9db2cf", boxSizing: "border-box" }}
                          />
                        </div>

                        <div style={{ marginBottom: "14px" }}>
                          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                            Category
                          </label>
                          <select
                            name="job_type"
                            value={editData.job_type}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #9db2cf", boxSizing: "border-box" }}
                          >
                            <option value="">Select a category</option>
                            {jobTypes.map((type) => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={{ marginBottom: "14px" }}>
                          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                            Location
                          </label>
                          <input
                            name="location"
                            value={editData.location}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #9db2cf", boxSizing: "border-box" }}
                          />
                        </div>

                        <div style={{ marginBottom: "14px" }}>
                          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                            Description
                          </label>
                          <textarea
                            name="content"
                            value={editData.content}
                            onChange={handleEditChange}
                            rows={4}
                            style={{ width: "100%", padding: "10px", border: "1px solid #9db2cf", boxSizing: "border-box" }}
                          />
                        </div>

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button
                            type="button"
                            onClick={() => handleSave(job.id)}
                            disabled={saving}
                            style={{
                              padding: "10px 16px",
                              border: "1px solid #2f5e9e",
                              backgroundColor: "#2f5e9e",
                              color: "white",
                              cursor: "pointer",
                            }}
                          >
                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            style={{
                              padding: "10px 16px",
                              border: "1px solid #999",
                              backgroundColor: "white",
                              color: "#333",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Top row: title + badge + buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
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
                              {formatJobType(job.job_type)}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <button
                              type="button"
                              onClick={() => handleEditClick(job)}
                              style={{
                                padding: "6px 14px",
                                border: "1px solid #2f5e9e",
                                backgroundColor: "#2f5e9e",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(job.id)}
                              disabled={deletingId === job.id}
                              style={{
                                padding: "6px 14px",
                                border: "1px solid #c0392b",
                                backgroundColor: "#c0392b",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                              }}
                            >
                              {deletingId === job.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "#444" }}>
                          {job.content}
                        </p>

                        {/* Bottom row: location + date */}
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
                          <span>Location: {job.location || "Unspecified"}</span>
                          <span>Posted by you on {formatDate(job.created_at)}</span>
                        </div>
                      </>
                    )}
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