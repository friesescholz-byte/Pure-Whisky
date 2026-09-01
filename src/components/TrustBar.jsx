import React from 'react';
import { Droplet, Recycle, Scale, Truck } from 'lucide-react';

export default function TrustBar() {
  const pillars = [
    {
      icon: Droplet,
      title: '100% Single Cask Reinform',
      desc: 'Direkt aus dem Fass: Unverdünnt (Fassstärke), ungefiltert, ungefärbt.'
    },
    {
      icon: Recycle,
      title: 'Zero Waste & Wild Glass',
      desc: '100% PCR-Glas, spanischer Naturkork, Biopolymer & handgestempelt.'
    },
    {
      icon: Scale,
      title: 'Juristisches Umwelt-Audit',
      desc: 'Vor-Ort-Prüfung der Brennereien nach Kriterien wie EMAS & ISO 14001.'
    },
    {
      icon: Truck,
      title: 'Sicherer Expressversand',
      desc: 'Klimaneutral & versichert mit DHL GoGreen. 18+ Altersverifikation.'
    }
  ];

  return (
    <section className="py-12 bg-[#121722]/60 border-y border-[#262F42]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#0B0E14] border border-[#D4A359]/30 text-[#D4A359] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#F6F4EE] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
