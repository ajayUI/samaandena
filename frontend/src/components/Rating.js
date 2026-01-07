import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating, totalReviews, size = 'sm' }) => {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`}
        />
      ))}
      {totalReviews > 0 && (
        <span className="text-sm text-stone-500 ml-1">({totalReviews})</span>
      )}
    </div>
  );
};

export const RatingInput = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          data-testid={`rating-star-${star}`}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={`w-8 h-8 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`}
          />
        </button>
      ))}
    </div>
  );
};