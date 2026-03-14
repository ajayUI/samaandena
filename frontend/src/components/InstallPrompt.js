import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, X, Share2, MoreVertical } from 'lucide-react';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If no prompt fires after 3 seconds, show manual guide option
    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setIsInstalled(true);
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else {
      setShowManualGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowManualGuide(false);
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <>
      {/* Install Banner */}
      {!showManualGuide && (
        <div
          data-testid="pwa-install-banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-2xl p-5 text-white relative">
            <button
              data-testid="pwa-dismiss-btn"
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight">Install SamaanDena</h3>
                <p className="text-white/80 text-xs mt-0.5">Quick access from your home screen</p>
              </div>
              <Button
                data-testid="pwa-install-btn"
                onClick={handleInstall}
                size="sm"
                className="bg-white text-green-600 hover:bg-green-50 font-semibold text-xs px-4 shrink-0"
              >
                Install
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Install Guide Modal */}
      {showManualGuide && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            data-testid="pwa-manual-guide"
            className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md mx-4 mb-0 md:mb-4 p-6 shadow-2xl"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-stone-800">Install SamaanDena App</h3>
              <button
                data-testid="pwa-guide-close-btn"
                onClick={handleDismiss}
                className="p-1 hover:bg-stone-100 rounded-full"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-4">
                <p className="text-stone-600 text-sm">Follow these steps in Safari:</p>
                <div className="space-y-3">
                  <Step num={1} icon={<Share2 className="w-4 h-4" />} text='Tap the Share button at the bottom of your browser' />
                  <Step num={2} icon={<Download className="w-4 h-4" />} text='Scroll down and tap "Add to Home Screen"' />
                  <Step num={3} icon={null} text='Tap "Add" to confirm' />
                </div>
              </div>
            ) : isChrome ? (
              <div className="space-y-4">
                <p className="text-stone-600 text-sm">Follow these steps in Chrome:</p>
                <div className="space-y-3">
                  <Step num={1} icon={<MoreVertical className="w-4 h-4" />} text={isAndroid ? 'Tap the three-dot menu at the top right' : 'Click the install icon in the address bar, or open the three-dot menu'} />
                  <Step num={2} icon={<Download className="w-4 h-4" />} text={isAndroid ? 'Tap "Add to Home screen" or "Install app"' : 'Click "Install SamaanDena"'} />
                  <Step num={3} icon={null} text='Tap "Install" to confirm' />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-stone-600 text-sm">To install this app:</p>
                <div className="space-y-3">
                  <Step num={1} icon={<MoreVertical className="w-4 h-4" />} text="Open your browser menu" />
                  <Step num={2} icon={<Download className="w-4 h-4" />} text='Look for "Install app" or "Add to Home Screen"' />
                  <Step num={3} icon={null} text="Confirm the installation" />
                </div>
              </div>
            )}

            <Button
              data-testid="pwa-guide-ok-btn"
              onClick={handleDismiss}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

const Step = ({ num, icon, text }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
      {num}
    </div>
    <div className="flex items-center gap-2 text-sm text-stone-700">
      {icon && <span className="text-stone-400">{icon}</span>}
      <span>{text}</span>
    </div>
  </div>
);
