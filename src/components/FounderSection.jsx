import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function FounderSection({ onOpenPhilosophy }) {
  return (
    <section id="about-section" className="py-28 lg:py-36 bg-white border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D4C8B8]">
              <img
                src={IMAGES.ines_portrait}
                alt="Ines Zager in Schottland"
                className="w-full h-[520px] object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-2">
              <span className="font-script text-3xl text-[#2D6A4F] block">
                Gründerin & Unabhängige Abfüllerin
              </span>
              <h2 className="font-woodblock text-4xl sm:text-5xl lg:text-6xl text-[#181F1C] tracking-wide uppercase leading-[0.95]">
                Vom Umweltrecht zum Lebenstraum im Whisky.
              </h2>
            </div>

            <div className="space-y-4 text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed">
              <p>
                Seit 20 Jahren bereise ich Schottlands entlegenste Brennereien auf der Jagd nach 
                außergewöhnlichen Fässern. In der Mitte des Lebens beschloss ich, volles Risiko zu gehen: 
                Ich fuhr meine erfolgreiche Karriere als Umwelt- und Energierechtlerin bei großen Energiekonzernen auf Teilzeit zurück, um PURE.WHISKY. zu gründen.
              </p>
              <p>
                Gefördert durch die weltweite <em>Our Whisky Foundation</em> und begleitet von Rachel Vaughn Jones (Marketing Director bei Compass Box), 
                verbinde ich juristische Transparenz mit sensorischer Leidenschaft. Jedes Fass wird vor Ort auf Wasserschutz und CO₂-Reduktion geprüft.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onOpenPhilosophy}
                className="inline-flex items-center space-x-2 font-woodblock text-xl tracking-wider uppercase text-[#B85D2C] hover:text-[#A04E24] transition-colors"
              >
                <span>Die 5 Säulen meiner Philosophie</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://www.zdf.de/arte/arte-re/page-video-artede-re-whisky-boom-mit-schattenseiten-100.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-sm text-[#55695E] hover:text-[#181F1C] font-semibold transition-colors font-craft-mono"
              >
                <span>ARTE/ZDF TV-Doku ansehen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
