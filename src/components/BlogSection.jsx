import React from 'react';
import { BLOG_POSTS } from '../data/pureWhiskyFullData';
import { Calendar, ArrowRight, Play } from 'lucide-react';

export default function BlogSection({ onOpenPost }) {
  return (
    <section id="blog-section" className="py-24 lg:py-32 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="text-left space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
              Journal · Messen · YouTube
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
              Aktuelles aus der Fasswelt.
            </h2>
            <p className="text-neutral-600 text-sm max-w-xl font-light">
              Echte Berichte von Verkostungen, Brennereibesuchen und Messen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="group cursor-pointer bg-[#FAF8F5] hover:bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between text-left shadow-xs hover:shadow-md"
            >
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-white/90 text-amber-900 text-[10px] uppercase tracking-wider font-semibold border border-neutral-200 shadow-xs">
                      {post.category}
                    </span>
                  </div>
                  {post.videoUrl && (
                    <div className="absolute bottom-3 right-3 p-2 rounded-full bg-amber-800 text-white shadow-md">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-500 font-light">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-serif text-xl text-neutral-900 font-normal leading-snug group-hover:text-amber-800 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-200 mt-4 flex items-center justify-between text-xs text-amber-800 font-semibold">
                <span>Beitrag lesen</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
