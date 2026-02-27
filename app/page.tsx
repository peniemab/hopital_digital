import Hero from '@/components/Hero';
import LeadCapture from '@/components/LeadCapture';
import Services from '@/components/Services';
import Features from '@/components/Features'; 
import Footer from '@/components/Footer'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Section 1 : Accueil */}
      <Hero />

      {/* Section 2 : Capture de prospects (Ton idée) */}
      <div id="appointment-form">
      <LeadCapture />
      </div>

    {/* section 3 : Service  */}
    <div id="services-section">
      <Services />
      </div>


    {/* section 4 : Caractéristiques */}
    <div id= "doctors-section">
      <Features />
      </div>

    {/* section 5 : pied de page */}
      <Footer /> 
    </main>
  );
}