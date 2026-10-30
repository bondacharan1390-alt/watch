'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export const JOURNAL_ARTICLES = [
  {
    id: 'art-1',
    slug: 'the-mathematics-of-36000-vph',
    title: 'The Mathematics of 36,000 VPH: Why High Frequency Matters',
    category: 'Chronometry & Physics',
    readTime: '6 min read',
    date: 'February 2026',
    excerpt: 'An investigation into how high-beat escapements absorb kinetic shocks and deliver a continuous, poetic sweep of the central seconds hand.',
    image: '/images/watch-apex.jpg',
  },
  {
    id: 'art-2',
    slug: 'secrets-of-black-polish-anglage',
    title: 'Poli Noir: The Lost Swiss Art of Hand-Beveling and Black Polish',
    category: 'Haute Craftsmanship',
    readTime: '8 min read',
    date: 'January 2026',
    excerpt: 'Step inside our atelier in Le Locle to witness how master artisans use zinc plates and diamond paste to produce surfaces that reflect pure light or pure darkness.',
    image: '/images/watch-skeleton.jpg',
  },
  {
    id: 'art-3',
    slug: 'preservation-and-care-of-mechanical-calibres',
    title: 'Preserving the Heartbeat: A Collector’s Guide to Mechanical Care',
    category: 'Horological Care',
    readTime: '5 min read',
    date: 'December 2025',
    excerpt: 'From demagnetization protocols to synthetic lubrication lifespans, how to ensure your mechanical timepiece runs seamlessly across generations.',
    image: '/images/watch-midnight.jpg',
  },
];

export function JournalPreview() {
  return (
    <section className="py-24 bg-chrono-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block mb-2">
              The CHARAN Gazette
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
              Horological Journal & Insights
            </h2>
          </div>

          <Link
            href="/journal"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-chrono-gold hover:text-chrono-gold-light transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal#${article.slug}`}
              className="rounded-2xl bg-chrono-900 border border-chrono-border overflow-hidden group hover:border-chrono-gold/50 transition-all flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="relative h-56 w-full bg-chrono-850 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-80 group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chrono-900 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-chrono-950/80 backdrop-blur-md border border-chrono-border text-chrono-gold">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-chrono-ivory-muted mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-chrono-ivory group-hover:text-chrono-gold transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-chrono-ivory-muted line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-chrono-border flex items-center gap-2 text-xs font-mono text-chrono-gold font-medium mt-4">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
