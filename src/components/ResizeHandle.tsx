import React, { useState } from 'react';

interface ResizeHandleProps {
  orientation?: string;
  onMouseDown: (_e: React.MouseEvent) => void;
  className?: string;
  isDragging?: boolean;
}

const ResizeHandle = ({
    orientation = 'vertical',
    onMouseDown,
    className = '',
    isDragging = false
}: ResizeHandleProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        onMouseDown(e);
    };

    return (
        <div
            className={`
        resize-handle relative
        ${orientation === 'vertical' ? 'cursor-col-resize' : 'cursor-row-resize'}
        ${className}
      `}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
        width: orientation === 'vertical' ? '6px' : '100%',
        height: orientation === 'vertical' ? '100%' : '6px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
      }}
    >
            {/* 1px visual line positioned in center */}
            <div
                className={`
          absolute
          ${isHovered || isDragging ? 'bg-white' : 'bg-transparent'}
          transition-colors duration-200
        `}
                style={{
          width: orientation === 'vertical' ? '1px' : '100%',
          height: orientation === 'vertical' ? '100%' : '1px',
          left: orientation === 'vertical' ? '50%' : '0',
          top: orientation === 'vertical' ? '0' : '50%',
          transform: orientation === 'vertical' ? 'translateX(-50%)' : 'translateY(-50%)'
        }}
      />
        </div>
    );
};

export default ResizeHandle;