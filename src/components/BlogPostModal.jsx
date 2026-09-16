import React, { useState } from 'react';
import { X, Calendar, User, ChevronLeft, ChevronRight, Play, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

export default function BlogPostModal({ post, onClose }) {
  if (!post) return null;

  // Resolve images array
  const images = post.images && post.images.length > 0 
    ? post.images 
    : [post.image || 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/ines-zager-islay-natur.webp'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fitMode, setFitMode] = useState('contain'); // 'contain' (vollständig sichtbar) | 'cover' (formatfüllend)
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const minSwipeDistance = 45;

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation (Arrow keys + Escape)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  // Helper to extract YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(post.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#D4C8B8] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="group absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-[#D4C8B8] flex items-center justify-center text-[#181F1C] hover:bg-[#181F1C] hover:text-white hover:border-[#181F1C] hover:rotate-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
          title="Schließen (Esc)"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* 1. MULTI-IMAGE CAROUSEL / SLIDER (OPTIMIERT FÜR TOUCH, WISCHEN & ZAPPEN) */}
        <div 
          className="relative h-72 sm:h-[420px] md:h-[460px] w-full bg-[#141A17] overflow-hidden rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Ambient blurred backdrop so portrait images look intentional and aesthetic without ugly black borders */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl scale-125 opacity-35 transition-all duration-700 pointer-events-none"
            style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Foreground Crisp Image (100% visible from top to bottom) */}
          <img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={`${post.title} - Bild ${activeImageIndex + 1}`}
            className={`relative z-10 transition-all duration-500 pointer-events-none ${
              fitMode === 'contain'
                ? 'max-h-full max-w-full w-auto h-auto object-contain p-2 sm:p-4 drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]'
                : 'w-full h-full object-cover'
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-craft-mono font-bold rounded-lg shadow-sm">
            {post.category}
          </div>

          {/* Aspect Ratio / Fit Toggle */}
          <button
            onClick={() => setFitMode(prev => prev === 'contain' ? 'cover' : 'contain')}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 px-3 py-1.5 rounded-full bg-black/55 hover:bg-black/85 text-white text-[11px] font-craft-mono font-bold backdrop-blur-md border border-white/20 transition-all flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            title={fitMode === 'contain' ? 'Formatfüllend vergrößern' : 'Ganzes Bild einpassen'}
          >
            {fitMode === 'contain' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{fitMode === 'contain' ? 'Vollbild' : 'Einpassen'}</span>
          </button>

          {/* Tap-to-Zap Zones (Left & Right 35% of image for effortless one-handed mobile zapping) */}
          {images.length > 1 && (
            <>
              <div
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-0 top-0 bottom-0 w-[35%] z-20 cursor-pointer"
                title="Vorheriges Bild (Antippen oder Wischen)"
                aria-label="Vorheriges Bild antippen"
              />
              <div
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-0 top-0 bottom-0 w-[35%] z-20 cursor-pointer"
                title="Nächstes Bild (Antippen oder Wischen)"
                aria-label="Nächstes Bild antippen"
              />
            </>
          )}

          {/* Carousel Arrows (only if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="group absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
                title="Vorheriges Bild (←)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="group absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer"
                title="Nächstes Bild (→)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              {/* Dots & Counter */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeImageIndex ? 'bg-white w-5' : 'bg-white/50 w-2 hover:bg-white/80'
                    }`}
                    title={`Zu Bild ${idx + 1}`}
                  />
                ))}
                <span className="text-[11px] text-white font-craft-mono font-bold pl-1">
                  {activeImageIndex + 1}/{images.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Preview Strip for Rapid Multi-Image Zapping */}
        {images.length > 1 && (
          <div className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 bg-[#181F1C] border-b border-[#262F42] overflow-x-auto select-none">
            <span className="text-[11px] font-craft-mono text-white/50 uppercase tracking-wider shrink-0 font-bold hidden sm:inline">
              Galerie ({images.length}):
            </span>
            <div className="flex items-center space-x-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    idx === activeImageIndex 
                      ? 'border-[#B85D2C] scale-105 shadow-md opacity-100 ring-1 ring-[#B85D2C]' 
                      : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/60'
                  }`}
                  title={`Bild ${idx + 1} ansehen`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

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
