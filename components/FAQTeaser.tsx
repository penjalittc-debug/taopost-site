'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { FAQS } from '@/lib/faq';

// На главной показываем только первые 5 вопросов — полный список на /faq.
const TEASER_COUNT = 5;

export default function FAQTeaser() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = FAQS.slice(0, TEASER_COUNT);

  return (
    <section id="faq" className="tp-section">
      <div className="tp-container">
        <div className="tp-section__head">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow__dot" />
            FAQ
          </span>
          <h2 className="tp-h2">
            Частые <span className="tp-gradient-text">вопросы</span>
          </h2>
          <p className="tp-lede">
            Самое популярное про сроки, цены и таможню. Полный список — на отдельной странице.
          </p>
        </div>

        <div className="ft__list">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <button
                key={item.question}
                type="button"
                className={`ft__item${open ? ' ft__item--open' : ''}`}
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
              >
                <span className="ft__q">
                  <span>{item.question}</span>
                  <ChevronDown size={18} strokeWidth={2.4} className="ft__chev" />
                </span>
                {open && <span className="ft__a">{item.answer}</span>}
              </button>
            );
          })}
        </div>

        <div className="ft__more">
          <Link
            href="/faq"
            className="ft__moreLink"
            data-ym-goal="faq_open_full"
            data-ym-params='{"place":"home_teaser"}'
          >
            Все {FAQS.length} вопросов и ответов
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .ft__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 820px;
          margin: 0 auto;
        }
        .ft__item {
          all: unset;
          display: block;
          width: 100%;
          padding: 18px 22px;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          cursor: pointer;
          transition: border-color .15s ease, box-shadow .15s ease;
          font-family: inherit;
        }
        .ft__item:hover { border-color: #9CA3AF; }
        .ft__item--open {
          border-color: var(--green, #005C43);
          box-shadow: 0 6px 18px -10px rgba(0,92,67,0.22);
        }
        .ft__q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-size: 15.5px;
          font-weight: 700;
          color: var(--ink, #0A0F1C);
          line-height: 1.4;
        }
        .ft__chev {
          color: #9CA3AF;
          transition: transform .2s ease, color .2s ease;
          flex-shrink: 0;
        }
        .ft__item--open .ft__chev {
          transform: rotate(180deg);
          color: var(--green, #005C43);
        }
        .ft__a {
          display: block;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #F3F4F6;
          font-size: 14.5px;
          color: #4B5563;
          line-height: 1.65;
          font-weight: 400;
        }

        .ft__more {
          margin-top: 28px;
          text-align: center;
        }
        .ft__moreLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 999px;
          background: #F9FAFB;
          color: var(--green-dark, #004232);
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          border: 1px solid #E5E7EB;
          transition: background .15s ease, border-color .15s ease, transform .15s ease;
        }
        .ft__moreLink:hover {
          background: rgba(0,92,67,0.06);
          border-color: var(--green, #005C43);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
