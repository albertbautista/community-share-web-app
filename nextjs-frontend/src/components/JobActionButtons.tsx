"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { acceptPost, unacceptPost } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

type JobActionButtonsProps = {
  postId: number;
  status: string;
  authorUsername: string;
  acceptedByUsername?: string | null;
};

export default function JobActionButtons({
  postId,
  status,
  authorUsername,
  acceptedByUsername = null,
}: JobActionButtonsProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { username: currentUsername } = useAuth();

  const isAuthor = useMemo(() => {
    if (!currentUsername) return false;
    return currentUsername === authorUsername;
  }, [currentUsername, authorUsername]);

  const isAcceptedByCurrentUser = useMemo(() => {
    if (!currentUsername || !acceptedByUsername) return false;
    return currentUsername === acceptedByUsername;
  }, [currentUsername, acceptedByUsername]);

  const handleAccept = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await acceptPost(postId);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to accept this job.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnaccept = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await unacceptPost(postId);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to reopen this job.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 16px",
    border: "1px solid #9db2cf",
    backgroundColor: "#dce7f5",
    color: "black",
    fontWeight: "bold" as const,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  };

  if (!currentUsername) {
    return (
      <div style={{ marginTop: "24px" }}>
        <p style={{ margin: "0 0 10px", color: "#555" }}>
          Log in to accept this job.
        </p>
        {error && (
          <p style={{ margin: 0, color: "#b00020", fontSize: "0.95rem" }}>{error}</p>
        )}
      </div>
    );
  }

  if (isAuthor) {
    return (
      <div style={{ marginTop: "24px" }}>
        <p style={{ margin: 0, color: "#555" }}>You cannot accept your own job posting.</p>
        {error && (
          <p style={{ marginTop: "10px", color: "#b00020", fontSize: "0.95rem" }}>{error}</p>
        )}
      </div>
    );
  }

  if (status === "accepted") {
    return (
      <div style={{ marginTop: "24px" }}>
        {isAcceptedByCurrentUser ? (
          <>
            <button type="button" onClick={handleUnaccept} disabled={isSubmitting} style={buttonStyle}>
              {isSubmitting ? "Reopening..." : "Reopen Job"}
            </button>
            <p style={{ margin: "10px 0 0", color: "#555" }}>
              You accepted this job. You can reopen it if needed.
            </p>
          </>
        ) : (
          <p style={{ margin: 0, color: "#555" }}>This job has already been accepted.</p>
        )}
        {error && (
          <p style={{ marginTop: "10px", color: "#b00020", fontSize: "0.95rem" }}>{error}</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <button type="button" onClick={handleAccept} disabled={isSubmitting} style={buttonStyle}>
        {isSubmitting ? "Accepting..." : "Accept Job"}
      </button>
      {error && (
        <p style={{ marginTop: "10px", color: "#b00020", fontSize: "0.95rem" }}>{error}</p>
      )}
    </div>
  );
}