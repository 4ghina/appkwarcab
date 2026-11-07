import { useState, useEffect, useRef, useCallback } from 'react';

export function useCarousel(total: number, autoPlayInterval: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => setCurrentIndex((p) => (p + 1) % (total || 1)), [total]);
  const prevSlide = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % (total || 1)), [total]);

  useEffect(() => {
    if (!isPlaying || total <= 1) return;
    timerRef.current = setInterval(nextSlide, autoPlayInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, autoPlayInterval, nextSlide, total]);

  const onTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const diff = touchStart - clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return {
    currentIndex,
    isPlaying,
    setIsPlaying,
    nextSlide,
    prevSlide,
    setTouchStart,
    onTouchEnd,
  };
}
