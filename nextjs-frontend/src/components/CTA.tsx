import Link from "next/link";

export default function CTA() {
    return (
            <section className="box highlight">
                <div className="box-content center">
                    <h2>Need Something Fixed?</h2>
                    <p>Post your job and get connected:</p>
                    <Link href="/post-job" className="primarybtn">
                        Click here to Post a Job.
                    </Link>
                    </div>
            </section>
    );
}


