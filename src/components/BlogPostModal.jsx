import React, { useState } from 'react';
import { X, Calendar, User, ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';

export default function BlogPostModal({ post, onClose }) {
  if (!post) return null;

  // Resolve images array
  const images = post.images && post.images.length > 0 
    ? post.images 
    : [post.image || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/ines-zager-islay-natur.webp'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper to extract YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(post.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#D4C8B8] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-[#D4C8B8] flex items-center justify-center text-[#181F1C] hover:bg-white transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. MULTI-IMAGE CAROUSEL / SLIDER */}
        <div className="relative h-72 sm:h-96 w-full bg-[#181F1C] overflow-hidden rounded-t-3xl">
          <img
            src={images[activeImageIndex]}
            alt={`${post.title} - Bild ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold rounded-lg">
            {post.category}
          </div>

          {/* Carousel Arrows (only if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
                title="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
                title="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots & Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeImageIndex ? 'bg-white w-5' : 'bg-white/50'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-white font-craft-mono font-bold pl-1">
                  {activeImageIndex + 1}/{images.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* 2. ARTICLE CONTENT */}
        <div className="p-8 sm:p-10 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-4 text-xs font-craft-mono text-[#55695E]">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{post.author}</span>
              </div>
            </div>

            <h2 className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] uppercase leading-tight">
              {post.title}
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E2DDD5] text-base text-[#181F1C] font-semibold leading-relaxed">
            {post.excerpt}
          </div>

          {/* Long Content Text */}
          <div className="text-base text-[#3A4A40] leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {post.content || post.excerpt}
          </div>

          {/* 3. OPTIONAL YOUTUBE VIDEO EMBED */}
          {youtubeId && (
            <div className="space-y-3 pt-4 border-t border-[#E2DDD5]">
              <div className="flex items-center space-x-2 text-[#2D6A4F] font-woodblock text-lg uppercase">
                <Play className="w-4 h-4 fill-[#2D6A4F]" />
                <span>Video-Einblick zum Beitrag</span>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#D4C8B8] shadow-md bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-6 border-t border-[#E2DDD5] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#181F1C] text-white font-woodblock text-sm uppercase tracking-wider hover:bg-[#3A4A40] transition-colors"
            >
              Schließen
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
