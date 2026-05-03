"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/">Home</Link>
                <Link href="/post-job">Post a Job</Link>
                <Link href="/browse-jobs">Browse Jobs</Link>
                <Link href="/my-jobs">My Jobs</Link>
            </div>

            <div className="navbar-right">
                {isAuthenticated ? (
                    <button 
                        onClick={handleSignOut} 
                        className="login-btn"
                    >
                        Sign Out
                    </button>
                ) : (
                    <>
                        <Link href="/signin" className="login-btn">
                            Sign In
                        </Link>
                        <Link href="/signup" className="login-btn">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}