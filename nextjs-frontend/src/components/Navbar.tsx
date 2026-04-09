"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/">Home</Link>
                <Link href="/post-job">Post a Job</Link>
                <Link href="/browse-jobs">Browse Jobs</Link>
                <Link href="/view">My Jobs</Link>
            </div>

            <div className="navbar-right">
                <Link href="/login" className = "Login-btn">
                Login
                </Link>
            </div>
        </nav>
    );
}