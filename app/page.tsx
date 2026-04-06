import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marketplaces from '@/components/Marketplaces';
import PriceComparison from '@/components/PriceComparison';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Tracking from '@/components/Tracking';
import Tariffs from '@/components/Tariffs';
import Loyalty from '@/components/Loyalty';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marketplaces />
        <PriceComparison />
        <Features />
        <HowItWorks />
        <Calculator />
        <Tracking />
        <Tariffs />
        <Loyalty />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
