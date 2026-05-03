import Image from "next/image";
import Navbar from "@/components/Navbar";
import JobActionButtons from "@/components/JobActionButtons";
import { getPostById } from "@/services/api";
import Link from "next/link";

type JobDetailPageProps = {
  params: Promise<{ id: string }>;
};

const jobTypeLabels: Record<string, string> = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  painting: "Painting",
  yard: "Yard Work",
  assembly: "Furniture Assembly",
  maintenance: "General Maintenance",
  other: "Other",
};

const formatJobType = (value: string) =>
  jobTypeLabels[value.toLowerCase()] || value;

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatPayRate = (value: number | null) => {
  if (value === null || value === undefined) return "Not provided";
  return `$${value.toFixed(2)}`;
};

const getImageSrc = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `http://127.0.0.1:8000${value}`;
};

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    throw new Error("Invalid job id.");
  }

  const job = await getPostById(postId);
  console.log("job detail payload:", job);

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "12px",
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
                  {job.title}
                </h1>

                <span
                  style={{
                    backgroundColor: "#dce7f5",
                    border: "1px solid #9db2cf",
                    padding: "4px 10px",
                    fontSize: "0.95rem",
                    color: "black",
                  }}
                >
                  {formatJobType(job.job_type)}
                </span>
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    backgroundColor:
                      job.status === "accepted" ? "#f8d7da" : "#dce7f5",
                    border: "1px solid #9db2cf",
                    padding: "4px 10px",
                    fontSize: "0.95rem",
                  }}
                >
                  {job.status === "accepted" ? "Accepted" : "Open"}
                </span>
              </div>

              <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#444" }}>
                <strong>Description:</strong> {job.content}
              </p>

              {job.image && (
                <div style={{ marginTop: "20px" }}>
                  <Image
                    src={getImageSrc(job.image)}
                    alt={job.title}
                    width={1200}
                    height={800}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 80vw"
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      height: "auto",
                      border: "1px solid #9db2cf",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  marginTop: "20px",
                  display: "grid",
                  gap: "10px",
                  fontSize: "0.95rem",
                  color: "#555",
                }}
              >
                <div>
                  <strong>Location:</strong> {job.location || "Not provided"}
                </div>
                <div>
                  <strong>Pay Rate:</strong> {formatPayRate(job.pay_rate)}
                </div>
                <div>
                  <strong>Posted by:</strong> {job.author.username}
                </div>
                <div>
                  <strong>Posted on:</strong> {formatDate(job.created_at)}
                </div>

                {job.accepted_by && (
                  <div>
                    <strong>Accepted by:</strong> {job.accepted_by.username}
                  </div>
                )}
              </div>

              <JobActionButtons
                postId={job.id}
                status={job.status}
                authorUsername={job.author.username}
                acceptedByUsername={job.accepted_by?.username ?? null}
              />

              <div style={{ marginTop: "24px" }}>
                <Link
                  href="/browse-jobs"
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    border: "1px solid #9db2cf",
                    backgroundColor: "#dce7f5",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Back to Browse Jobs
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}