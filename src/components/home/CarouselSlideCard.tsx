import React from 'react';
import { Sparkles } from 'lucide-react';
import { CarouselSlide } from './carouselData';

interface CarouselSlideCardProps {
  slide: CarouselSlide;
  onSlideClick?: (slide: CarouselSlide) => void;
}

export const CarouselSlideCard: React.FC<CarouselSlideCardProps> = ({ slide, onSlideClick }) => {
  return (
    <div className="relative h-48 sm:h-64 md:h-72 w-full">
      <img
        src={slide.imageDesktop}
        alt={slide.imageAlt}
        className="absolute inset-0 w-full h-full object-cover opacity-45 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />

      <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end z-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950">
            {slide.category}
          </span>
          <span className="text-[11px] text-amber-200/90 font-medium">
            Sasaran: {slide.targetAudience}
          </span>
        </div>

        <h2 className="text-sm sm:text-lg font-black leading-tight text-white line-clamp-2">
          {slide.title}
        </h2>

        <p className="text-xs text-stone-300 line-clamp-2 max-w-xl">
          {slide.description}
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              slide.buttonAction?.();
              onSlideClick?.(slide);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.buttonLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
