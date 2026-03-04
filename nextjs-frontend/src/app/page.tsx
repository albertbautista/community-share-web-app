import NavBar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Howitworks from "@/components/howitworks";
import Footer from "@/components/Footer";   
import Services from "@/components/services";
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <>
            <NavBar />

            <div className="layout">
                <Hero />
                <Services />
                <Howitworks />
                <CTA />
            </div>

            <Footer />
        </>
    );
}   