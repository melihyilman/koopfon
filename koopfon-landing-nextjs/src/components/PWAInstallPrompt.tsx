'use client';

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect mobile and iOS
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    const ios = /iphone|ipad|ipod/.test(userAgent);
    
    setIsMobile(mobile);
    setIsIOS(ios);

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    console.log('Adding beforeinstallprompt listener');
    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('Already installed as PWA');
      setIsInstallable(false);
      return;
    }

    // Check if user has dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedDate = localStorage.getItem('pwa-install-dismissed-date');
    
    console.log('dismissed:', dismissed, 'dismissedDate:', dismissedDate, 'mobile:', mobile, 'ios:', ios);
    
    // Show prompt logic
    const shouldShow = !dismissed || (dismissedDate && Date.now() - parseInt(dismissedDate) > 7 * 24 * 60 * 60 * 1000);
    
    if (shouldShow) {
      // For Android Chrome - wait for beforeinstallprompt
      if (mobile && !ios) {
        const mobileTimer = setTimeout(() => {
          if (!deferredPrompt) {
            // If no beforeinstallprompt event after 5 seconds, show manual instructions
            console.log('No beforeinstallprompt event - showing mobile instructions');
            setIsInstallable(true);
            setShowInstallDialog(true);
          }
        }, 5000);
        
        // Clear timer if event fires
        const eventTimer = setTimeout(() => {
          if (deferredPrompt) {
            clearTimeout(mobileTimer);
            setShowInstallDialog(true);
          }
        }, 3000);
        
        return () => {
          clearTimeout(mobileTimer);
          clearTimeout(eventTimer);
        };
      }
      
      // For iOS - always show manual instructions
      if (ios) {
        setTimeout(() => {
          console.log('iOS detected - showing install instructions');
          setIsInstallable(true);
          setShowInstallDialog(true);
        }, 3000);
      }
      
      // For desktop - wait for beforeinstallprompt
      if (!mobile) {
        const desktopTimer = setTimeout(() => {
          if (deferredPrompt) {
            setShowInstallDialog(true);
          }
        }, 3000);
        
        return () => clearTimeout(desktopTimer);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallDialog(false);
    setIsInstallable(false);
  };

  const handleDismiss = () => {
    setShowInstallDialog(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    localStorage.setItem('pwa-install-dismissed-date', Date.now().toString());
  };

  const handleLater = () => {
    setShowInstallDialog(false);
  };

  if (!isInstallable) return null;

  return (
    <Dialog
      open={showInstallDialog}
      onClose={handleLater}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '8px',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', paddingBottom: 1 }}>
        <GetAppIcon sx={{ fontSize: 48, color: 'var(--koopfon-primary)', marginBottom: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'var(--koopfon-secondary)' }}>
          Koopfon Uygulamasını Yükle
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', paddingTop: 0 }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Koopfon&apos;u {isMobile ? 'telefonunuza' : 'bilgisayarınıza'} yükleyerek daha hızlı erişim sağlayabilirsiniz.
        </Typography>
        
        {isIOS && (
          <Box sx={{ 
            backgroundColor: '#e3f2fd', 
            borderRadius: '8px', 
            padding: 2,
            marginBottom: 2,
            textAlign: 'left'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#1976d2' }}>
              iOS Yükleme Adımları:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              1. Safari&apos;de bu sayfayı açın<br/>
              2. Alt menüdeki paylaş butonuna ⬆️ tıklayın<br/>
              3. &quot;Ana Ekrana Ekle&quot; seçeneğini seçin<br/>
              4. &quot;Ekle&quot; butonuna basın
            </Typography>
          </Box>
        )}
        
        {isMobile && !isIOS && (
          <Box sx={{ 
            backgroundColor: '#e8f5e8', 
            borderRadius: '8px', 
            padding: 2,
            marginBottom: 2,
            textAlign: 'left'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#2e7d32' }}>
              Android Yükleme Adımları:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              1. Chrome&apos;da bu sayfayı açın<br/>
              2. Menü (⋮) butonuna tıklayın<br/>
              3. &quot;Ana ekrana ekle&quot; seçeneğini seçin<br/>
              4. &quot;Ekle&quot; butonuna basın
            </Typography>
          </Box>
        )}
        
        <Box sx={{ 
          backgroundColor: 'var(--koopfon-primary-background)', 
          borderRadius: '8px', 
          padding: 2,
          marginBottom: 2 
        }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Avantajları:
          </Typography>
          <Typography variant="body2" component="div" sx={{ textAlign: 'left' }}>
            • Hızlı erişim<br/>
            • Offline çalışma<br/>
            • Ana ekran kısayolu<br/>
            • Daha iyi performans
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
        <Button onClick={handleDismiss} color="inherit" sx={{ color: 'gray' }}>
          Şimdi Değil
        </Button>
        <Box>
          <Button onClick={handleLater} sx={{ marginRight: 1, color: 'var(--koopfon-secondary)' }}>
            Sonra
          </Button>
          {deferredPrompt ? (
            <Button 
              onClick={handleInstallClick}
              variant="contained"
              sx={{ 
                backgroundColor: 'var(--koopfon-primary)',
                '&:hover': {
                  backgroundColor: 'var(--koopfon-green-light)',
                }
              }}
              startIcon={<GetAppIcon />}
            >
              Yükle
            </Button>
          ) : (
            <Button 
              onClick={handleLater}
              variant="contained"
              sx={{ 
                backgroundColor: 'var(--koopfon-primary)',
                '&:hover': {
                  backgroundColor: 'var(--koopfon-green-light)',
                }
              }}
              startIcon={<GetAppIcon />}
            >
              Anladım
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}