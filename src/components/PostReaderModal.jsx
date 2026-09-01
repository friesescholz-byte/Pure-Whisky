import React from 'react';
import { X, Calendar, User, ExternalLink, Play, Tv } from 'lucide-react';

export default function PostReaderModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md" />

      <div className="relative w-full max-w-3xl bg-[#121722] border border-[#D4A359]/30 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 text-left max-h-[88vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0E14] text-[#A0AEC0] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-xs text-[#A0AEC0] mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#0B0E14] text-[#D4A359] font-bold border border-[#262F42]">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-6">
          {post.title}
        </h1>

        {post.videoUrl && (
          <div className="mb-6 p-4 rounded-2xl bg-[#0B0E14] border border-[#262F42] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-rose-500 fill-rose-500" />
              <div>
                <div className="text-xs font-bold text-[#F6F4EE]">Video-Beitrag</div>
                <div className="text-[11px] text-[#A0AEC0]">Auf YouTube / Mediathek ansehen</div>
              </div>
            </div>
            <a
              href={post.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-[#D4A359] text-[#0B0E14] text-xs font-bold hover:bg-[#E9C68A] flex items-center gap-1.5"
            >
              <span>Video öffnen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="text-sm sm:text-base text-[#D8D2C2] leading-relaxed whitespace-pre-line space-y-4">
          {post.content}
        </div>

      </div>
    </div>
  );
}
