import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutView({ onNavigateShop, onNavigateHome, onOpenSustainability }) {
  const { lang, t } = useLanguage();

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Main Headline */}
        <div className="mb-14 space-y-4 max-w-3xl mx-auto text-center">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            {t.about.badge}
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            {t.about.title}
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            {t.about.lead}
          </p>
        </div>

        {/* Ines Portrait */}
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

        {/* Narrative & Quote */}
        <div className="max-w-3xl mx-auto mb-28 space-y-10">
          
          <div className="py-6 border-y border-[#E2DDD5] text-center space-y-3">
            <blockquote className="font-script text-3xl sm:text-4xl text-[#181F1C] leading-snug max-w-2xl mx-auto italic">
              {t.about.quote}
            </blockquote>
            <span className="font-craft-mono text-xs uppercase tracking-widest text-[#B85D2C] font-bold block">
              — Ines Zager · Gründerin PURE.WHISKY.
            </span>
          </div>

          <div className="space-y-6 text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed text-left">
            <p>
              {t.about.storyP1}
            </p>
            <p>
              {t.about.storyP2}
            </p>
          </div>

        </div>

        {/* 4 Pillars of Vision */}
        <div className="space-y-24 mb-28">
          
          {/* Pillar 1: Women in Whisky */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                {lang === 'de' ? 'Frauenperspektive?' : 'Women in Whisky?'}
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                {lang === 'de' ? 'Eine andere Perspektive auf Whisky' : 'A Different Perspective on Whisky'}
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                {lang === 'de'
                  ? '„Weiblich. Unabhängig. Und vor allem: ohne Dogmen.“'
                  : '“Female. Independent. And above all: without dogmas.”'}
              </blockquote>
              <div className="space-y-4 text-[#3A4A40] text-base sm:text-lg font-normal leading-relaxed">
                <p>
                  {lang === 'de'
                    ? 'Was ist eigentlich eine weibliche Perspektive auf Whisky? Keine Ahnung. Und genau das ist der Punkt.'
                    : 'What exactly is a female perspective on whisky? No idea. And that is precisely the point.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Ich glaube nicht an Whisky für bestimmte Zielgruppen. Nicht an Regeln, wie man ihn trinken „muss“. Und nicht daran, dass Alter, Farbe oder ein möglichst dunkles Sherryfass automatisch für Qualität stehen. Gut ist, was gefällt.'
                    : 'I do not believe in whisky for specific target groups. Nor in rules on how one “must” drink it. And not in the assumption that age, colour, or an ultra-dark sherry cask automatically equate to quality. Whatever you like is good.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'PURE.WHISKY. steht für meinen persönlichen Blick auf Scotch Whisky: unabhängig, neugierig und mit einem Faible für unverfälschten Charakter. Mich interessiert die DNA einer Brennerei – und ein Fass, das sie nicht überdeckt, sondern sichtbar macht.'
                    : 'PURE.WHISKY. stands for my personal take on Scotch whisky: independent, curious, and with a passion for unadulterated character. I am drawn to a distillery’s DNA – and a cask that reveals rather than masks it.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'Geprägt hat mich dabei auch die OurWhisky Foundation, die Frauen in der Whiskywelt vernetzt und fördert. Im Rahmen ihres Mentoring-Programms hatte ich das Glück, Compass Box als Mentor an meiner Seite zu haben – ein Austausch, der meinen eigenen Weg als unabhängige Abfüllerin entscheidend mitgeprägt hat.'
                    : 'I was also shaped by the OurWhisky Foundation, which connects and champions women in the whisky world. Through their mentorship programme, I had the privilege of having Compass Box as my mentor – an exchange that decisively guided my journey as an independent bottler.'}
                </p>
                <p>
                  {lang === 'de'
                    ? 'PURE.WHISKY. will Whisky nicht komplizierter machen. Sondern ehrlicher, zugänglicher und ein bisschen weniger vorhersehbar.'
                    : 'PURE.WHISKY. does not want to make whisky more complicated. But more honest, accessible, and a little less predictable.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.frauenperspektive}
                  alt="Frauenperspektive im Whisky"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Pillar 2: Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.mission}
                  alt="Reine Fassstärke"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                {lang === 'de' ? 'Meine Mission' : 'Our Mission'}
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                {lang === 'de' ? 'Single Cask Whisky in Reinform' : 'Single Cask Whisky in Its Purest State'}
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                {lang === 'de'
                  ? '„Direkt aus dem Fass – unverdünnt, ungefiltert und ohne Fantasienamen.“'
                  : '“Straight from the cask – undiluted, unchillfiltered, without generic pseudonyms.”'}
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Als unabhängiger Abfüller erwerbe ich einzelne Fässer bekannter Brennereien und fülle diese unter eigenem Namen ab: direkt aus dem Fass, nicht kühlgefiltert, ungefärbt und unverdünnt in nativer Fassstärke.'
                  : 'As an independent bottler, I personally acquire individual casks from renowned distilleries: directly from the barrel, unchillfiltered, natural in colour, and undiluted at cask strength.'}
              </p>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Ich kaufe nur Fässer, bei denen ich den echten Namen der Brennerei offiziell nennen darf. Transparente Herkunft ist mein unbedingter Anspruch.'
                  : 'I only select casks whose genuine distillery origin I can openly display on the label. Provenance transparency is an absolute rule.'}
              </p>
            </div>
          </div>

          {/* Pillar 3: Selection & Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                {lang === 'de' ? 'Brennerei-Auswahl' : 'Distillery Selection'}
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                {lang === 'de' ? 'Bewertet nach EMAS & ISO 14001' : 'Assessed under EMAS & ISO 14001'}
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                {lang === 'de'
                  ? '„Verantwortung fängt bei der Quelle und der Energieversorgung an.“'
                  : '“Accountability begins with pristine spring water and renewable energy.”'}
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'Die Hintergründe jeder Brennerei untersuche ich vor dem Kauf sorgfältig nach Kriterien, die sich an anerkannten Umweltmanagementsystemen wie EMAS und ISO 14001 orientieren. Bewertet werden unter anderem Wassermanagement, Quellenschutz, regenerative Energie und geschlossene Kreisläufe.'
                  : 'Prior to acquiring any cask, I carefully examine each distillery according to criteria guided by established environmental management systems like EMAS and ISO 14001, assessing watershed protection, cooling water recirculation, biomass energy, and circular resource use.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenSustainability}
                  className="inline-flex items-center space-x-2 text-base font-woodblock uppercase tracking-wider text-[#B85D2C] hover:underline cursor-pointer"
                >
                  <span>{lang === 'de' ? 'Details zu den Nachhaltigkeitskriterien' : 'Explore Sustainability Triangle'}</span>
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

          {/* Pillar 4: Quality Promise */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#D4C8B8] shadow-md h-84">
                <img
                  src={IMAGES.versprechen}
                  alt="Qualitätsversprechen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-woodblock text-2xl text-[#B85D2C] uppercase block">
                {lang === 'de' ? 'Mein Versprechen' : 'Personal Promise'}
              </span>
              <h3 className="font-woodblock text-4xl text-[#181F1C] uppercase leading-tight">
                {lang === 'de' ? 'Kompromisslose Qualität mit gutem Gewissen' : 'Uncompromising Quality with a Clear Conscience'}
              </h3>
              <blockquote className="font-script text-2xl text-[#2D6A4F] italic">
                {lang === 'de'
                  ? '„Genuss mit bestem Gewissen – persönlich ausgewählt und bewertet.“'
                  : '“Appreciation with a clear conscience – handpicked and evaluated in person.”'}
              </blockquote>
              <p className="text-[#3A4A40] text-lg font-normal leading-relaxed">
                {lang === 'de'
                  ? 'PURE.WHISKY. bietet unberührten Single Cask Genuss. Jedes Fass, jede Flasche Wild Glass und jeder Partner werden von mir persönlich auf höchste Qualität und echte Nachhaltigkeit geprüft.'
                  : 'PURE.WHISKY. is committed to pure single cask delight. Every oak barrel, every Wild Glass bottle, and every partner is evaluated by me for excellence and environmental integrity.'}
              </p>
            </div>
          </div>

        </div>

        {/* CTA Box */}
        <div className="bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            {lang === 'de' ? 'Erlebe die Haltung im Glas' : 'Experience the Vision'}
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase max-w-2xl mx-auto">
            {t.about.ctaShop}
          </h2>
          <p className="text-[#3A4A40] text-lg max-w-xl mx-auto font-normal leading-relaxed">
            {lang === 'de'
              ? 'Streng limitiert, unverdünnt in nativer Fassstärke abgefüllt in 100% PCR Wild Glass.'
              : 'Strictly limited, undiluted at natural cask strength, bottled into 100% PCR Wild Glass.'}
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t.hero.btnShop}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
