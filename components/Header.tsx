'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'О компании', href: '#about' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Маркетплейсы', href: '#marketplaces' },
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`hdr${scrolled ? ' hdr--scrolled' : ''}`}>
      <div className="hdr__inner">
        <Link href="/" className="hdr__logo">
          <Image src="/logo.png" alt="TaoPost" width={100} height={100} style={{ objectFit: 'contain' }} priority />
          <span className="hdr__brand">
            Tao<span className="hdr__brandAccent">Post</span>
          </span>
        </Link>

        <nav className="hdr__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hdr__navLink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hdr__actions">
          <a
            href="https://t.me/taopostmaneger?start=site"
            target="_blank"
            rel="noopener noreferrer"
            className="hdr__cta"
          >
            <Send size={14} strokeWidth={2.5} />
            Написать нам
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="hdr__burger"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen
              ? <X size={22} strokeWidth={2.3} />
              : <Menu size={22} strokeWidth={2.3} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="hdr__mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hdr__mobileLink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/taopostmaneger?start=site"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-btn tp-btn--primary hdr__mobileCta"
            onClick={() => setMenuOpen(false)}
          >
            <Send size={16} strokeWidth={2.5} />
            Написать в Telegram
          </a>
        </div>
      )}

      <style jsx>{`
        .hdr {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .hdr--scrolled {
          background: rgba(255,255,255,0.88);
          border-bottom-color: rgba(10,15,28,0.06);
          box-shadow: 0 4px 24px -8px rgba(10,15,28,0.05);
        }

        .hdr__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hdr__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .hdr__brand {
          font-weight: 900;
          font-size: 24px;
          color: var(--ink);
          letter-spacing: -0.6px;
        }
        .hdr__brandAccent {
          background: linear-gradient(90deg, var(--green), var(--coral));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hdr__nav {
          display: flex;
          gap: 2px;
          align-items: center;
        }
        .hdr__navLink {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          border-radius: 10px;
          transition: color .15s, background .15s;
        }
        .hdr__navLink:hover {
          color: var(--green-dark);
          background: rgba(27,158,126,0.08);
        }

        .hdr__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hdr__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: var(--coral);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 8px 22px -8px rgba(255,107,71,0.55), inset 0 -2px 0 rgba(0,0,0,0.12);
          transition: transform .15s, box-shadow .15s;
          white-space: nowrap;
        }
        .hdr__cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -8px rgba(255,107,71,0.65), inset 0 -2px 0 rgba(0,0,0,0.12);
        }

        .hdr__burger {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          cursor: pointer;
          color: var(--ink);
        }

        .hdr__mobile {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(10,15,28,0.06);
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
        }
        .hdr__mobileLink {
          display: block;
          padding: 14px 4px;
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid #F3F4F6;
        }
        .hdr__mobileCta {
          margin-top: 18px;
          width: 100%;
        }

        @media (max-width: 900px) {
          .hdr__nav { display: none; }
          .hdr__cta { display: none; }
          .hdr__burger { display: inline-flex; }
        }
      `}</style>
    </header>
  );
}
