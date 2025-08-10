'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ContactSection from '@/components/ContactSection';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function HomePage() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [fabStyle, setFabStyle] = useState({});

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme === 'dark') {
              setFabStyle({
                backgroundColor: 'var(--koopfon-primary-background)',
                color: 'var(--koopfon-primary)',
              });
            } else {
              setFabStyle({
                backgroundColor: 'var(--koopfon-primary)',
                color: 'var(--koopfon-white)',
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = [heroRef, featuresRef, contactRef, footerRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection ref={heroRef} data-theme="light" />
      <FeaturesSection ref={featuresRef} data-theme="dark" />
      <ContactSection ref={contactRef} data-theme="light" />
      <Footer ref={footerRef} />
      
      <PWAInstallPrompt />

      {showScrollButton && (
        <Fab
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            ...fabStyle,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </>
  );
}
