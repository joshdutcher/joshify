import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
    onSearch, 
    onNavigateToSearch,
    placeholder = "What would you like to explore?",
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const inputRef = useRef(null);

    // Add keyboard shortcut (Cmd/Ctrl + K) to focus search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsExpanded(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
        setIsExpanded(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!query.trim()) {
            setIsExpanded(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onNavigateToSearch?.(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
        onSearch?.('');
        inputRef.current?.focus();
    };

    const handleClick = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <div className={`flex items-center ${className}`}>
            <form onSubmit={handleSubmit} className="w-full">
                <div 
                    className={`relative flex items-center h-10 transition-all duration-200 ${
            isExpanded 
              ? 'bg-spotify-dark hover:bg-spotify-hover rounded-full border border-transparent hover:border-gray-500' 
              : 'bg-spotify-dark hover:bg-spotify-hover rounded-full border border-transparent hover:border-gray-500'
          } ${isFocused ? 'bg-spotify-hover border-gray-400' : ''}`}
                    onClick={handleClick}
        >
                    <Search className="absolute left-4 w-4 h-4 text-spotify-secondary" />
          
                    {isExpanded ? (
                        <>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder={placeholder}
                                className="w-full bg-transparent pl-12 pr-12 py-3 text-base text-spotify-primary placeholder-spotify-secondary focus:outline-none"
              />
                            {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-4 text-spotify-secondary hover:text-spotify-primary transition-colors"
                >
                                <X className="w-4 h-4" />
                            </button>
              )}
                        </>
          ) : (
              <div className="w-full h-full flex items-center pl-12 cursor-text">
                  <span className="text-base text-spotify-secondary">{placeholder}</span>
              </div>
          )}
                </div>
            </form>
        </div>
    );
};

export default SearchBar;