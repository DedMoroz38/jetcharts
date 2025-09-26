import { useState, useEffect } from 'react';
import type { ErrorT } from '../types';

type ErrorPopupProps = {
  error: ErrorT;
  onRetry: () => void;
  onClose: () => void;
}

const ErrorPopup = ({ error, onRetry, onClose }: ErrorPopupProps) => {
  const [countdown, setCountdown] = useState(0);
  const [isRetryDisabled, setIsRetryDisabled] = useState(false);

  useEffect(() => {
    if (error?.status === 429) {
      setCountdown(5);
      setIsRetryDisabled(true);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsRetryDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [error]);

  if (!error) return null;

  const handleRetry = () => {
    if (!isRetryDisabled) {
      onRetry();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-secondary border border-border rounded-2xl p-6 max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">Error</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-white mb-2">
            {error.status === 429 ? 'Too many requests' : error.message}
          </p>
          {error.status === 429 && (
            <p className="text-gray-400 text-sm">
              Please wait before trying again.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleRetry}
            disabled={isRetryDisabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              isRetryDisabled
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRetryDisabled ? `Retry (${countdown}s)` : 'Retry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
