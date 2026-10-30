'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/components/home/JournalPreview';

export default function JournalPage() {
  const articles = [
    ...JOURNAL_ARTICLES,
    {
      id: 'art-4',
      slug: 'the-evolution-of-water-resistance',
      title: 'From 50 to 300 Meters: The Engineering of Abyssal Hermeticity',
      category: 'Marine Engineering',
      readTime: '7 min read',
      date: 'November 2025',
      excerpt: 'How helium escape valves, threaded screw-down crowns, and synthetic Viton gaskets allow mechanical balances to tick undisturbed in the ocean abyss.',
      image: '/images/watch-aqua.jpg',
    },
    {
      id: 'art-5',
      slug: 'the-mystery-of-flying-tourbillons',
      title: 'Countering Gravity: The Mechanics of the Flying Tourbillon',
      category: 'Grand Complications',
      readTime: '9 min read',
      date: 'October 2025',
      excerpt: 'First conceived by Abraham-Louis Breguet in 1801, explored through our open-worked Royal Skeleton tourbillon carriage weighing a mere 0.28 grams.',
      image: '/images/watch-celestial.jpg',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-chrono-950 text-chrono-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            The CHARAN Gazette • Editorial
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-chrono-ivory">
            Horological Journal & Essays
          </h1>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            In-depth perspectives on movement physics, metallurgy breakthroughs, and the enduring philosophy of mechanical chronometry.
          </p>
        </div>

        {/* Featured Top Article */}
        <div className="rounded-3xl bg-chrono-900 border border-chrono-border overflow-hidden mb-16 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] bg-chrono-850">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-chrono-gold/10 text-chrono-gold border border-chrono-gold/30">
                {articles[0].category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chrono-ivory leading-snug">
                {articles[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-chrono-ivory-muted leading-relaxed">
                {articles[0].excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-chrono-border flex items-center justify-between text-xs font-mono">
              <span className="text-chrono-ivory-muted">{articles[0].date} • {articles[0].readTime}</span>
              <a href={`#${articles[0].slug}`} className="text-chrono-gold hover:text-chrono-gold-light flex items-center gap-1 font-bold">
                Read Essay <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              id={art.slug}
              className="rounded-2xl bg-chrono-900 border border-chrono-border overflow-hidden flex flex-col justify-between hover:border-chrono-gold/40 transition-colors"
            >
              <div className="relative h-56 w-full bg-chrono-850 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover brightness-85 hover:brightness-100 transition-all duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-chrono-950/80 backdrop-blur-md border border-chrono-border text-chrono-gold">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-chrono-ivory-muted mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {art.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-chrono-ivory mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-chrono-ivory-muted leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-chrono-border/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-chrono-gold">Le Locle Archives</span>
                  <span className="text-chrono-ivory-muted">Author: M. Belmont</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
