import React, { useState } from 'react';
import { Leaf, Sparkles, Package } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  category,
  ...props
}) => {
  const [error, setError] = useState(false);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF8F3] via-stone-100 to-amber-50/60 border border-stone-200 text-stone-700 p-4 relative overflow-hidden ${className}`}>
        {/* Background Subtle Leaf Motif */}
        <div className="absolute inset-0 bg-[radial-gradient(#4E6E4C_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

        <div className="w-12 h-12 rounded-full bg-[#1C3A27] text-amber-200 flex items-center justify-center mb-2 shadow-sm border border-amber-300/60 shrink-0 z-10">
          <Leaf className="w-6 h-6 text-[#C59B27]" />
        </div>

        <span className="font-serif font-bold text-xs text-stone-900 text-center line-clamp-2 px-2 z-10">
          {alt || 'Ashoka Product'}
        </span>

        <span className="text-[10px] font-extrabold text-[#4E6E4C] uppercase tracking-widest mt-1 bg-emerald-100/80 px-2 py-0.5 rounded-full z-10">
          {category || 'Organic Wellness'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Ashoka Product'}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};
