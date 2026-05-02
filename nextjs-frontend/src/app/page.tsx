import NavBar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Howitworks from "@/components/howitworks";
import Footer from "@/components/Footer";
import Services from "@/components/services";
import CTA from "@/components/CTA";
import { getPopularJobTypes, getRecentPosts } from "@/services/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, jobTypes] = await Promise.all([
    getRecentPosts(6),
    getPopularJobTypes(6),
  ]);

  return (
    <>
      <NavBar />

      <div className="layout">
        <Hero />
        <Services jobTypes={jobTypes.map((item) => item.job_type)} />

        <section className="box">
          <div className="box-header">Recent Community Jobs</div>
          <div className="box-content">
            {posts.length === 0 ? (
              <p>No recent jobs found.</p>
            ) : (
              <ul className="recent-posts">
                {posts.map((post) => (
                  <li key={post.id} className="recent-post-item">
                    <h3>{post.title}</h3>
                    <div className="recent-post-meta">
                      <span>Posted by {post.author.username}:</span>
                      <span>
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <Howitworks />
        <CTA />
      </div>

      <Footer />
    </>
  );
}
