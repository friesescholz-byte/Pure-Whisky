import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../data/pureWhiskyFullData';

export default function BlogTeaser({ onOpenBlog, onOpenPost, onOpenShop }) {
  const top2 = BLOG_POSTS.slice(0, 2);

  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5] border-b border-[#E2DDD5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-2 max-w-xl">
            <span className="font-script text-3xl text-[#2D6A4F] block">
              Journal & Einblicke
            </span>
            <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase">
              Aktuelles aus der Whiskywelt.
            </h2>
          </div>

          <button
            onClick={onOpenBlog}
            className="inline-flex items-center space-x-2 font-woodblock text-xl tracking-wider uppercase text-[#B85D2C] hover:text-[#A04E24] transition-colors"
          >
            <span>Alle Berichte im Journal lesen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {top2.map(post => (
            <article
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="bg-white border border-[#D4C8B8] rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div>
                <div className="h-60 rounded-2xl overflow-hidden border border-[#E2DDD5] mb-6 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold">
                    {post.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-craft-mono text-[#55695E] flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </span>
                  <h3 className="font-woodblock text-3xl text-[#181F1C] uppercase group-hover:text-[#B85D2C] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#3A4A40] leading-relaxed pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E2DDD5] text-xs font-woodblock uppercase tracking-wider text-[#B85D2C] group-hover:underline">
                Artikel lesen →
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
