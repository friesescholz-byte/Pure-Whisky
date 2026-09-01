import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Droplets, Leaf, BookOpen, Tv, Heart, CheckCircle } from 'lucide-react';
import { PRODUCTS, PHILOSOPHY_PILLARS, BLOG_POSTS, IMAGES } from '../data/pureWhiskyFullData';

export default function HomeView({ setActiveTab, onSelectProduct, onSelectPillar, onSelectPost }) {
  return (
    <div className="space-y-24 sm:space-y-32 pt-28 pb-20 text-left">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121722] border border-[#D4A359]/40">
              <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-ping" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4A359]">
                Single Cask · Sustainable · Ines Zager
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#F6F4EE] leading-[1.1]">
              Single Cask <br />
              <span className="gold-gradient-text">Sustainable Whisky.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#D8D2C2] max-w-2xl font-normal leading-relaxed">
              Willkommen bei PURE.WHISKY. – handverlesene Einzelfässer bekannter schottischer Brennereien in nativer Fassstärke. Radikal nachhaltig abgefüllt in 100% recyceltes Wild Glass, transparent geprüft von Umweltjuristin Ines Zager.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('shop')}
                className="px-8 py-4 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] hover:shadow-[0_0_25px_rgba(212,163,89,0.4)] transition-all flex items-center gap-2"
              >
                <span>Shop besuchen (4 Fässer)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className="px-6 py-4 rounded-full bg-[#121722] border border-[#262F42] text-[#F6F4EE] hover:border-[#D4A359] text-xs font-semibold transition-all"
              >
                Über Ines Zager & Mission
              </button>
            </div>

            {/* Quick Pillars Trust */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#262F42]/80 max-w-lg">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#D4A359]">100%</div>
                <div className="text-[11px] text-[#A0AEC0]">Fassstärke & Pur</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#F6F4EE]">Wild Glass</div>
                <div className="text-[11px] text-[#A0AEC0]">100% Recycelt</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#D4A359]">ZDF / ARTE</div>
                <div className="text-[11px] text-[#A0AEC0]">Bekannt aus Doku</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#121722] border border-[#D4A359]/30 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A359]/10 to-transparent pointer-events-none" />
              
              <img
                src={IMAGES.tomatin}
                alt="Tomatin 16 Jahre PURE.WHISKY."
                className="max-h-[380px] mx-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-500"
              />

              <div className="mt-4 p-4 rounded-2xl bg-[#0B0E14]/90 border border-[#262F42] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#D4A359]">Aktueller Release</div>
                  <div className="font-serif text-sm font-bold text-[#F6F4EE]">Tomatin 16 Jahre (53,2%)</div>
                </div>
                <button
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="px-3.5 py-1.5 rounded-lg bg-[#D4A359] text-[#0B0E14] text-xs font-bold hover:bg-[#E9C68A]"
                >
                  Details
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DIE 5 SÄULEN DER PHILOSOPHIE (Original Seiten-Roter Faden) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Der rote Faden</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F4EE] mb-4">
            Die 5 Bausteine von PURE.WHISKY.
          </h2>
          <p className="text-[#D8D2C2] text-sm sm:text-base">
            Entdecken Sie die Werte, die jede einzelne Abfüllung von Ines Zager prägen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onSelectPillar(pillar)}
              className="p-6 rounded-2xl bg-[#121722] border border-[#262F42] hover:border-[#D4A359] cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A359] mb-2 block">
                  Pillar
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F6F4EE] group-hover:text-[#D4A359] transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#A0AEC0] line-clamp-3 leading-relaxed mb-4">
                  {pillar.subtitle}
                </p>
              </div>
              <div className="text-[11px] font-bold text-[#D4A359] flex items-center gap-1">
                <span>Lesen</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DIE 4 RELEASES IM ÜBERBLICK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-2">
              Limitierte Auflage
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F4EE]">
              Unsere 4 Single Cask Abfüllungen
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#D4A359] hover:underline flex items-center gap-1.5"
          >
            <span>Alle im Shop ansehen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-[#121722] border border-[#262F42] flex flex-col justify-between group hover:border-[#D4A359]/50 transition-all shadow-xl"
            >
              <div>
                <div className="relative aspect-[3/4] p-4 flex items-center justify-center bg-[#0B0E14] rounded-xl mb-4 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-[220px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    prod.isAvailable ? 'bg-[#0B0E14] text-[#D4A359] border border-[#D4A359]/30' : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {prod.badge}
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase text-[#D4A359] mb-1">
                  {prod.region} · {prod.age}
                </div>
                <h3 className="font-serif text-base font-bold text-[#F6F4EE] mb-2 leading-snug">
                  {prod.name}
                </h3>
                <div className="text-xs text-[#A0AEC0] line-clamp-2 mb-3">
                  {prod.character.join(' · ')}
                </div>
              </div>

              <div className="pt-3 border-t border-[#262F42] flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-[#F6F4EE]">
                    {prod.price.toFixed(2).replace('.', ',')} €
                  </div>
                  <div className="text-[9px] text-[#718096]">{prod.pricePerLiter}</div>
                </div>
                <button
                  onClick={() => onSelectProduct(prod)}
                  className="px-3 py-1.5 rounded-lg bg-[#D4A359] text-[#0B0E14] text-xs font-bold hover:bg-[#E9C68A]"
                >
                  Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOUNDER HIGHLIGHT & ZDF DOKU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121722] border border-[#262F42] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4A359]/40 shadow-xl">
              <img
                src={IMAGES.ines_scotland}
                alt="Ines Zager in Schottland"
                className="w-full h-auto object-cover max-h-[380px]"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0B0E14]/90 backdrop-blur-sm border border-[#262F42]">
                <div className="text-xs font-serif font-bold text-[#F6F4EE]">Ines Zager</div>
                <div className="text-[10px] text-[#D4A359]">Umweltjuristin & Gründerin von PURE.WHISKY.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4A359]">
              <Tv className="w-4 h-4" />
              <span>Bekannt aus ARTE / ZDF & Our Whisky Foundation</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F6F4EE]">
              „Mir gefällt purer Whisky ohne elitäre Dogmen.“
            </h2>
            <p className="text-sm text-[#D8D2C2] leading-relaxed">
              Nach 20 Jahren als spezialisierte Juristin im Umwelt- und Genehmigungsrecht bei großen Energiekonzernen gründete Ines Zager 2023 PURE.WHISKY. – als eine der sehr wenigen unabhängigen Abfüllerinnen in Europa.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.zdf.de/arte/arte-re/page-video-artede-re-whisky-boom-mit-schattenseiten-100.html"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#0B0E14] border border-[#262F42] text-xs font-semibold text-[#D4A359] hover:border-[#D4A359] transition-all flex items-center gap-2"
              >
                <span>ARTE-Reportage ansehen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 rounded-xl bg-[#D4A359] text-[#0B0E14] text-xs font-bold hover:bg-[#E9C68A] transition-all"
              >
                Die ganze Geschichte lesen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AKTUELLER BLOG TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A359] mb-2">
              Journal & Erlebnisse
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#F6F4EE]">
              Aktuelles aus dem Blog
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('blog')}
            className="text-xs font-bold uppercase tracking-wider text-[#D4A359] hover:underline flex items-center gap-1"
          >
            <span>Alle Artikel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-6 rounded-2xl bg-[#121722] border border-[#262F42] hover:border-[#D4A359] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#A0AEC0] mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B0E14] text-[#D4A359] font-semibold border border-[#262F42]">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#F6F4EE] mb-2 hover:text-[#D4A359] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#A0AEC0] line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>
              <span className="text-xs font-bold text-[#D4A359] flex items-center gap-1">
                Weiterlesen &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEWSLETTER TEASER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121722] border border-[#D4A359]/40 shadow-2xl">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-3">
            Verpassen Sie keine neuen Abfüllungen von PURE.WHISKY.
          </div>
          <p className="text-xs sm:text-sm text-[#D8D2C2] max-w-lg mx-auto mb-6">
            Registrieren Sie sich für den Newsletter. Kein Spam, nur relevante Neuigkeiten zu meinen Whiskys und 24h Vorabzugriff auf neue Drops.
          </p>
          <button
            onClick={() => setActiveTab('newsletter')}
            className="px-8 py-3.5 rounded-full bg-[#D4A359] text-[#0B0E14] font-bold text-xs uppercase tracking-wider hover:bg-[#E9C68A] transition-all"
          >
            Zum Newsletter-Abonnement
          </button>
        </div>
      </section>

    </div>
  );
}
