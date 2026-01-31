import { useEffect } from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
    // Handle escape key press to close modal
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 mx-4 w-full max-w-md">
                <div className="bg-spotify-card rounded-lg p-6 shadow-2xl">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-spotify-hover rounded-full flex items-center justify-center text-spotify-secondary hover:text-spotify-primary hover:bg-spotify-lightgray transition-colors"
                        aria-label="Close welcome modal"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Content */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-spotify-primary mb-4">
                            Welcome to Joshify!
                        </h2>

                        <p className="text-spotify-secondary mb-4">
                            This is my portfolio reimagined as a Spotify clone.
                            Each project is presented as a &quot;track&quot;, complete with real songs with lyrics,
                            album art and immersive canvas video backgrounds.
                        </p>

                        <p className="text-spotify-secondary mb-6">
                            Browse collections, explore individual projects, and enjoy the
                            familiar interface.
                        </p>

                        <p className="text-spotify-secondary mb-4">
                            I really do recommend you listen to the songs and read the lyrics. They&apos;re kind of amazing.
                        </p>

                        <p className="text-sm text-spotify-secondary mb-6">
                            You can always revisit this window by clicking &quot;About Joshify&quot; in the sidebar.
                        </p>

                        {/* Get Started Button */}
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-6 bg-spotify-green text-black font-bold rounded-full hover:scale-105 hover:bg-[#1ed760] transition-all"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
