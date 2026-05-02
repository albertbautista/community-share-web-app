import Link from "next/link";

export default function HowItWorks() {
    return (
        <section className="box">
            <div className="box-header">How It Works</div>
            <div className="box-content">
                <ol>
                    <li>
                        <Link href="/signup">Create an account</Link>
                    </li>
                    <li>
                        <Link href="/post-job">Post a job</Link>
                    </li>
                    <li>
                        <Link href="/browse-jobs">Find a job</Link>
                    </li>
                </ol>
            </div>
        </section>
    );
}
