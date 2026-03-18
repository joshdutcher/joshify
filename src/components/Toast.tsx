interface ToastProps {
    message: string;
    visible: boolean;
}

const Toast = ({ message, visible }: ToastProps) => (
    <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] px-4 py-2.5 bg-[#282828] text-white text-sm font-semibold rounded-full shadow-2xl transition-all duration-200 pointer-events-none whitespace-nowrap ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
    >
        {message}
    </div>
);

export default Toast;
