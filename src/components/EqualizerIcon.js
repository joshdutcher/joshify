import React from 'react';

const EqualizerIcon = ({ className = '' }) => {
    return (
        <div className={`flex items-end justify-center space-x-0.5 w-5 h-5 ${className}`}>
            <div 
                className="bg-spotify-green w-0.5"
                style={{
          animation: 'equalizerBar1 0.8s ease-in-out infinite'
        }}
      />
            <div 
                className="bg-spotify-green w-0.5"
                style={{
          animation: 'equalizerBar2 0.9s ease-in-out infinite'
        }}
      />
            <div 
                className="bg-spotify-green w-0.5"
                style={{
          animation: 'equalizerBar3 0.7s ease-in-out infinite'
        }}
      />
            <div 
                className="bg-spotify-green w-0.5"
                style={{
          animation: 'equalizerBar4 1.1s ease-in-out infinite'
        }}
      />
      
            <style>{`
        @keyframes equalizerBar1 {
          0%, 100% { height: 20%; }
          25% { height: 60%; }
          50% { height: 40%; }
          75% { height: 80%; }
        }
        @keyframes equalizerBar2 {
          0%, 100% { height: 50%; }
          25% { height: 90%; }
          50% { height: 30%; }
          75% { height: 70%; }
        }
        @keyframes equalizerBar3 {
          0%, 100% { height: 70%; }
          25% { height: 40%; }
          50% { height: 90%; }
          75% { height: 20%; }
        }
        @keyframes equalizerBar4 {
          0%, 100% { height: 40%; }
          25% { height: 80%; }
          50% { height: 60%; }
          75% { height: 95%; }
        }
      `}</style>
        </div>
    );
};

export default EqualizerIcon;