import ContactSection from "@/src/components/contactUs/contactform";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

type ContactPageProps = {
  searchParams?: Promise<{
    message?: string;
    topic?: string;
  }>;
};

export default async function Home({ searchParams }: ContactPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <>
      <Navbar />
      <main>
         <section id="contact-us">
        <ContactSection initialMessage={params.message ?? ""} initialTopic={params.topic ?? ""} />
        </section>
      </main>
      <Footer />
    </>
  );
}
