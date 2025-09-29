import React, { useState, useEffect, useRef, useCallback, Children } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdaptiveCardGridProps {
    children: React.ReactNode;
    className?: string;
    maxRows?: number;
    cardWidth?: number;
    gap?: number;
}

const AdaptiveCardGrid = ({
    children,
    className = '',
    maxRows = 2,
    cardWidth = 188, // Default card width for calculations
    gap = 16 // Default gap in pixels
}: AdaptiveCardGridProps) => {
    const [showHorizontalScroll, setShowHorizontalScroll] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const checkScrollNeeded = useCallback(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const itemCount = Children.count(children);

        // Calculate how many cards can fit in one row
        const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
        const maxVisibleCards = cardsPerRow * maxRows;

        // Show horizontal scroll if we have more cards than can fit in maxRows
        const needsHorizontalScroll = itemCount > maxVisibleCards;
        setShowHorizontalScroll(needsHorizontalScroll);

        if (needsHorizontalScroll && scrollRef.current) {
            updateScrollButtons();
        }
    }, [children, cardWidth, gap, maxRows, updateScrollButtons]);

    const updateScrollButtons = useCallback(() => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
    
        const scrollAmount = cardWidth * 2 + gap * 2; // Scroll by 2 cards
        const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
        scrollRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        checkScrollNeeded();
    
        const handleResize = () => {
            checkScrollNeeded();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [children, cardWidth, gap, maxRows, checkScrollNeeded]);

    useEffect(() => {
        if (showHorizontalScroll && scrollRef.current) {
            const scrollContainer = scrollRef.current;
            scrollContainer.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons(); // Initial check

            return () => scrollContainer.removeEventListener('scroll', updateScrollButtons);
        }
        return undefined;
    }, [showHorizontalScroll, updateScrollButtons]);

    if (showHorizontalScroll) {
        return (
            <div className={`relative ${className}`} ref={containerRef}>
                {/* Horizontal scroll layout */}
                <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide pb-2"
                    style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          } as React.CSSProperties}
        >
                    {children}
                </div>
        
                {/* Left scroll button */}
                {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/80 hover:bg-black rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-200 hover:scale-105"
                    aria-label="Scroll left"
          >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
        )}
        
                {/* Right scroll button */}
                {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/80 hover:bg-black rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-200 hover:scale-105"
                    aria-label="Scroll right"
          >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
        )}
            </div>
        );
    }

    // Grid layout when cards fit within maxRows
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ${className}`} ref={containerRef}>
            {children}
        </div>
    );
};

export default AdaptiveCardGrid;