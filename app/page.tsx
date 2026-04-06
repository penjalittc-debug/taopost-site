import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Marketplaces from '@/components/Marketplaces';
import HowItWorks from '@/components/HowItWorks';
import Tariffs from '@/components/Tariffs';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Marketplaces />
        <Tariffs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
