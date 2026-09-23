import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../data/pureWhiskyFullData';
import { useLanguage } from '../context/LanguageContext';

export default function BlogTeaser({ posts, onOpenBlog, onOpenPost, onOpenShop }) {
  const { lang, t } = useLanguage();
  const source = posts && posts.length > 0 ? posts : BLOG_POSTS;
  const top2 = source.slice(0, 2);

  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 space-y-4 md:space-y-0">
          <div className="space-y-2 max-w-xl">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              {lang === 'de' ? 'Journal & Einblicke' : 'Journal & Insights'}
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              {lang === 'de' ? 'Aktuelles aus der Whiskywelt.' : 'News from the World of Whisky.'}
            </h2>
          </div>

          <button
            onClick={onOpenBlog}
            className="inline-flex items-center space-x-2 font-woodblock text-lg tracking-wider uppercase text-[#B85D2C] hover:text-[#A04E24] transition-colors cursor-pointer"
          >
            <span>{lang === 'de' ? 'Alle Berichte im Journal lesen' : 'Read all stories in Journal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-12">
          {top2.map(post => (
            <article
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="bg-white border border-[#D4C8B8] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div>
                <div className="h-56 sm:h-60 rounded-2xl overflow-hidden border border-[#E2DDD5] mb-5 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold">
                    {post.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-craft-mono text-[#55695E] flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </span>
                  <h3 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase group-hover:text-[#B85D2C] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#3A4A40] leading-relaxed pt-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                <span className="font-craft-mono text-xs text-[#55695E]">
                  Von {post.author}
                </span>
                <span className="font-craft-mono text-xs font-bold text-[#B85D2C] flex items-center space-x-1 group-hover:underline">
                  <span>{t.blog.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
