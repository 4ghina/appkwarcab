import React from 'react';
import { CarouselSlide, DEFAULT_CAROUSEL_SLIDES } from './home/carouselData';
import { CarouselSlideCard } from './home/CarouselSlideCard';
import { CarouselNavControls } from './home/CarouselNavControls';
import { useCarousel } from './home/useCarousel';

export type { CarouselSlide };

interface HeroCarouselProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
  className?: string;
  onSlideClick?: (slide: CarouselSlide) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides: propSlides,
  autoPlayInterval = 6000,
  className = '',
  onSlideClick,
}) => {
  const slides = (propSlides && propSlides.length > 0) ? propSlides : DEFAULT_CAROUSEL_SLIDES;
  const published = slides.filter((s) => s.status === 'published').sort((a, b) => a.order - b.order);

  const {
    currentIndex,
    isPlaying,
    setIsPlaying,
    nextSlide,
    prevSlide,
    setTouchStart,
    onTouchEnd,
  } = useCarousel(published.length, autoPlayInterval);

  if (published.length === 0) return null;
  const current = published[currentIndex];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl bg-stone-900 text-white shadow-md ${className}`}
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <CarouselSlideCard slide={current} onSlideClick={onSlideClick} />
      <CarouselNavControls
        isPlaying={isPlaying}
        onPrev={prevSlide}
        onNext={nextSlide}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
};
