import type { Project } from '../types';

interface ProjectImageProps {
  project: Project;
  size?: string;
  className?: string;
  shape?: string;
  showFallback?: boolean;
  customStyle?: Record<string, any>;
}

// Utility function to get initials from title
const getInitials = (title: string) => {
    if (!title) return '??';
    return title.split(' ').map((word: string) => word[0]).join('').slice(0, 2).toUpperCase();
};

/**
 * Centralized component for displaying project images with smart fallbacks
 *
 * @param {Object} project - The project object
 * @param {string} size - Size preset: 'small', 'medium', 'large', or 'custom'
 * @param {string} className - Additional CSS classes
 * @param {string} shape - Shape: 'square', 'rounded', 'circle'
 * @param {boolean} showFallback - Whether to show initials fallback (default: true)
 * @param {Object} customStyle - Custom inline styles
 */
const ProjectImage = ({
    project,
    size = 'medium',
    className = '',
    shape = 'rounded',
    showFallback = true,
    customStyle = {}
}: ProjectImageProps) => {
    // Size presets
    const sizeClasses = {
        tiny: 'w-6 h-6',
        small: 'w-10 h-10',
        medium: 'w-12 h-12',
        large: 'w-16 h-16',
        custom: '' // Use className or customStyle
    };

    // Shape classes
    const shapeClasses = {
        square: 'rounded-none',
        rounded: 'rounded-sm',
        circle: 'rounded-full'
    };

    const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium;
    const shapeClass = shapeClasses[shape as keyof typeof shapeClasses] || shapeClasses.rounded;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Hide the broken image and show the fallback
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const next = target.nextSibling as HTMLElement;
        if (next) {
            next.style.display = 'flex';
        }
    };

    const hasValidImage = project?.image &&
                       !project.image.includes('/api/placeholder');

    return (
        <div
            className={`relative ${sizeClass} ${shapeClass} overflow-hidden flex-shrink-0 ${className}`}
            style={customStyle}
    >
            {/* Main Image */}
            {hasValidImage && (
            <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover ${shapeClass}`}
                onError={handleImageError}
        />
      )}

            {/* Fallback with Initials */}
            {!hasValidImage && (
            <div
                className={`w-full h-full flex items-center justify-center ${shapeClass} ${
            showFallback ? 'bg-gradient-to-br from-spotify-green to-green-700' : 'bg-spotify-card border border-spotify-hover'
          }`}
        >
                <span
                    className={`font-bold ${showFallback ? 'text-white' : 'text-spotify-secondary'} ${
              size === 'tiny' ? 'text-xs' :
              size === 'small' ? 'text-xs' :
              size === 'medium' ? 'text-sm' :
              size === 'large' ? 'text-base' : 'text-sm'
            }`}
                    style={customStyle.fontSize ? { fontSize: customStyle.fontSize } : {}}
          >
                    {getInitials(project?.title)}
                </span>
            </div>
      )}
        </div>
    );
};

export default ProjectImage;