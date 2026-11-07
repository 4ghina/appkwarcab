import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface CarouselNavControlsProps {
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

export const CarouselNavControls: React.FC<CarouselNavControlsProps> = ({
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}) => {
  return (
    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Slide sebelumnya"
        className="p-1 rounded-full hover:bg-white/20 text-white"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Jeda carousel' : 'Putar carousel'}
        className="p-1 rounded-full hover:bg-white/20 text-white"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Slide berikutnya"
        className="p-1 rounded-full hover:bg-white/20 text-white"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
