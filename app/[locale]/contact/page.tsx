import ContactSection from "@/src/components/contactUs/contactform";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
         <section id="contact-us">
        <ContactSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
