import React from 'react';
import { ArrowRight, Calendar, User, Play, Sparkles, Image as ImageIcon } from 'lucide-react';
import { BLOG_POSTS } from '../data/pureWhiskyFullData';

export default function BlogView({ posts, onOpenPost, onNavigateShop, onNavigateHome }) {
  const allPosts = posts || BLOG_POSTS;

  return (
    <div className="pt-32 pb-36 bg-[#FAF8F5] min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Page Main Headline */}
        <div className="mb-20 space-y-4 max-w-3xl">
          <span className="font-script text-3xl sm:text-4xl text-[#2D6A4F] block">
            Journal & Einblicke
          </span>
          <h1 className="font-woodblock text-5xl sm:text-6xl lg:text-7xl text-[#181F1C] tracking-wide uppercase leading-tight">
            Schottland, Messen & Tastings.
          </h1>
          <p className="text-[#3A4A40] text-lg sm:text-xl font-normal leading-relaxed pt-2">
            Begleiten Sie Ines Zager auf ihren Reisen durch Schottland, zu Brennerei-Audits, 
            Messeauftritten und exklusiven Verkostungen.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {allPosts.map((post) => {
            const imgCount = post.images ? post.images.length : (post.image ? 1 : 0);
            const coverImg = post.images && post.images.length > 0 ? post.images[0] : (post.image || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/ines-zager-islay-natur.webp');

            return (
              <article
                key={post.id}
                className="bg-white border border-[#D4C8B8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  <div className="h-56 rounded-2xl overflow-hidden border border-[#E2DDD5] relative shadow-sm bg-[#FAF8F5]">
                    <img
                      src={coverImg}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold">
                      {post.category}
                    </div>

                    {imgCount > 1 && (
                      <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold flex items-center space-x-1.5">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{imgCount} Bilder</span>
                      </div>
                    )}

                    {post.videoUrl && (
                      <div className="absolute bottom-4 right-4 p-2 rounded-full bg-[#B85D2C] text-white shadow-md">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-[#55695E] font-craft-mono pt-1">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase leading-tight group-hover:text-[#B85D2C] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#3A4A40] text-base font-normal leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E2DDD5] mt-6">
                  <button
                    onClick={() => onOpenPost(post)}
                    className="inline-flex items-center space-x-2 text-sm font-woodblock uppercase tracking-wider text-[#B85D2C] group/btn"
                  >
                    <span>Vollständigen Beitrag & Galerie ansehen</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Chic CTA Box to Shop */}
        <div className="bg-[#E8EFEA] border border-[#C5D8CC] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs">
          <span className="font-script text-3xl text-[#2D6A4F] block">
            Vom Journal ins Glas
          </span>
          <h2 className="font-woodblock text-4xl sm:text-5xl text-[#181F1C] tracking-wide uppercase max-w-2xl mx-auto">
            Erlebe die Single Cask Abfüllungen aus den Berichten.
          </h2>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-lg bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-xl tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
            >
              <span>Zu den 4 Fässern im Shop</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
