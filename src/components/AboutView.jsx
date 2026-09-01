import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function AboutView({ onNavigateShop, onNavigateHome, onOpenSustainability }) {
  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Main Headline (Centered & Elegant) */}
        <div className="mb-14 space-y-4 max-w-3xl mx-auto text-center">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            Die Gründerin & Ihre Vision
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Vom Umweltrecht zum Lebenstraum im Whisky.
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            Als eine der sehr wenigen unabhängigen Whiskyabfüllerinnen in Europa verbindet 
            Juristin Ines Zager unberührte Einzelfässer in nativer Fassstärke 
            mit handfestem Umweltbewusstsein und radikaler Transparenz.
          </p>
        </div>

        {/* 1. ERST DAS BILD: Zentriert, perfekt proportioniert & unbeschnitten */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-lg relative bg-white">
            <img
              src={IMAGES.ines_portrait}
              alt="Ines Zager an der schottischen Küste"
              className="w-full h-auto object-contain block filter brightness-[0.98] contrast-[1.02]"
              loading="eager"
            />
          </div>
        </div>

        {/* 2. DANN DER TEXT DARUNTER: Schick gesetzt mit Zitat & Story */}
        <div className="max-w-3xl mx-auto mb-28 space-y-10">
          
          {/* Centered Editorial Quote Banner */}
          <div className="py-6 border-y border-[#E2DDD5] text-center space-y-3">
            <blockquote className="font-script text-3xl sm:text-4xl text-[#181F1C] leading-snug max-w-2xl mx-auto italic">
              „Heute, in meinen Vierzigern mit 20 Jahren Berufserfahrung, habe ich das Selbstvertrauen gewonnen, das zu tun, was ich schon immer tun wollte.“
            </blockquote>
            <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
              — Ines Zager · Gründerin PURE.WHISKY.
            </span>
          </div>

          {/* Narrative Story Blocks */}
          <div className="space-y-6 text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed text-left">
            <p>
              Seit über 20 Jahren bereise ich die Welt auf der Suche nach den spannendsten Einzelfässern. 
              Als Juristin mit Spezialisierung auf Umwelt-, Genehmigungs- und Energierecht bei großen 
              Energiekonzernen beschloss ich 2023, meine juristische Karriere auf Teilzeit zurückzufahren 
              und PURE.WHISKY. zu gründen – ein Unternehmen, das strikt meinen persönlichen Werten verpflichtet ist.
            </p>
            <p>
              Besonderer Dank gilt der weltweiten <strong>Our Whisky Foundation</strong>, die Frauen im Whisky fördert. 
              Als Mentee wurde mir Rachel Vaughn Jones (Marketing Director von Compass Box Whisky) zur Seite gestellt. 
              Gemeinsam beweisen wir, dass Whisky frei von Dogmen, Vorurteilen und künstlichem Versteckspiel sein kann.
            </p>
          </div>

        </div>

        {/* 3. DIE 4 SÄULEN DER PHILOSOPHIE */}
        <div className="space-y-24 mb-28">
          
          <div className="border-b border-[#E2DDD5] pb-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">Die 4 Säulen</span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              Werte, Haltung & Qualitätsversprechen.
            </h2>
          </div>

          {/* Säule 1: Die Frauenperspektive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                01 · Die Frauenperspektive
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                Frei von Dogmen & Elitismus
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                „Ich glaube nicht an bestimmten Whisky für bestimmte Gruppen. Gut ist, was gefällt.“
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                Tatsächlich bin ich eine der sehr wenigen weiblichen unabhängigen Whiskyabfüllerinnen auf dem europäischen Markt. Was ist eine weibliche Perspektive auf Whisky? Was ich versprechen kann, ist ein vorurteilsfreier Blick auf Trends und Trinkgewohnheiten.
              </p>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                Ich glaube nicht an Dogmen wie „kein Eis im Whisky“ oder elitäre Urteile nach Alter und dunkler Fassfarbe. Mir gefällt purer Whisky. PURE.WHISKY. steht für eine Abkehr von den oft überladenen Sherry-Abfüllungen – zurück zur unverfälschten DNA der einzelnen Brennerei.
              </p>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.frauenperspektive}
                  alt="Die Frauenperspektive im Whisky"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Säule 2: Meine Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.mission}
                  alt="Reine Fassstärke & Handwerk"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                02 · Meine Mission
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                Single Cask Whisky in Reinform
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                „Direkt aus dem Fass – unverdünnt, ungefiltert und ohne Fantasienamen.“
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                Als unabhängiger Abfüller erwerbe ich einzelne Fässer bekannter Brennereien und fülle diese unter eigenem Namen ab: direkt aus dem Fass, nicht kühlgefiltert, ungefärbt und unverdünnt in nativer Fassstärke.
              </p>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                In der Konsequenz bedeutet dies: Ich kaufe nur Fässer, bei denen ich den echten Namen der Brennerei offiziell nennen darf. Bei mir gibt es kein „Secret Highland“ oder Versteckspiel, sondern 100% transparente Herkunft.
              </p>
            </div>
          </div>

          {/* Säule 3: Vor-Ort Umwelt-Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                03 · Umwelt-Audit vor Ort
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                Geprüft nach EMAS & ISO 14001
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                „Verantwortung fängt bei der Quelle und der Energieversorgung an.“
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                Jede Brennerei wird vor dem Kauf vor Ort besucht und nach handfesten Umweltkriterien auditiert. Wir bewerten Wassermanagement, Quellenschutz, regenerative Energie (z. B. Biomasse bei Tomatin) und geschlossene Kreisläufe.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenSustainability}
                  className="inline-flex items-center space-x-2 text-base font-woodblock uppercase tracking-wider text-[#B85D2C] hover:underline"
                >
                  <span>Details zum Umwelt-Audit lesen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.ines_barrel}
                  alt="Ines Zager im Fasslager"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Säule 4: Mein persönliches Qualitätsversprechen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.versprechen}
                  alt="Mein Qualitätsversprechen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                04 · Mein Versprechen
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                Kompromisslose Qualität mit gutem Gewissen
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                „Genuss mit bestem Gewissen – persönlich ausgewählt und geprüft.“
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                PURE.WHISKY. hat es sich zum Ziel gesetzt, das pure Whiskyvergnügen wie kein anderer unabhängiger Abfüller zu bieten. 
                Jedes Fass, jedes Glas und jeder Partner werden von mir persönlich nicht nur auf sensorische Exzellenz, sondern auf Erfüllung harter Nachhaltigkeitskriterien ausgewählt.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Schottland Impressionen Galerie */}
        <div className="space-y-8 mb-28">
          <div className="border-b border-[#E2DDD5] pb-4">
            <span className="font-script text-3xl text-[#2D6A4F] block">Eindrücke vor Ort</span>
            <h2 className="font-woodblock text-4xl text-[#181F1C] tracking-wide uppercase">
              Schottland, Fässer & Begegnungen.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="h-64 rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-xs">
              <img src={IMAGES.scotland_distillery} alt="Brennereibesuch Schottland" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-xs">
              <img src={IMAGES.scotland_coast} alt="Schottische Küste" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-xs">
              <img src={IMAGES.tasting_springbank} alt="Tasting mit Frauen in Glasgow" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-xs">
              <img src={IMAGES.scotland_travel} alt="Whiskyreisen Schottland" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* 5. Chic CTA Box to Shop */}
        <div className="bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            Erlebe die Haltung im Glas
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase max-w-2xl mx-auto">
            Entdecke die aktuellen 4 handverlesenen Einzelfässer.
          </h2>
          <p className="text-[#3A4A40] text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Streng limitiert, unverdünnt in nativer Fassstärke abgefüllt in 100% PCR Wild Glass.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
            >
              <span>Direkt zu den 4 Fässern im Shop</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
