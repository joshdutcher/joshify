import { Check } from 'lucide-react';

interface SharePopoverProps {
    url: string;
    copied: boolean;
    anchorRect: DOMRect;
    onCopy: () => void;
    onClose: () => void;
}

const ShareModal = ({ url, copied, anchorRect, onCopy, onClose }: SharePopoverProps) => (
    <div className="fixed inset-0 z-[199]" onClick={onClose}>
        <div
            style={{
                position: 'fixed',
                left: anchorRect.left + anchorRect.width / 2,
                top: anchorRect.top - 8,
                transform: 'translate(-50%, -100%)',
                zIndex: 200,
            }}
            className="flex items-center space-x-3 bg-[#282828] rounded-lg px-4 py-2.5 shadow-2xl whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
        >
            <span className="text-spotify-secondary text-sm truncate max-w-[280px]">{url}</span>
            <button
                onClick={onCopy}
                className="flex-shrink-0 px-4 py-1.5 bg-spotify-green text-black text-sm font-semibold rounded-full hover:brightness-110 transition-all flex items-center space-x-1"
            >
                {copied ? (
                    <span className="flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                    </span>
                ) : (
                    <span>Copy</span>
                )}
            </button>
        </div>
    </div>
);

export default ShareModal;
