import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotWrapperRef = useRef(null);
  const ringWrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaChange = (e) => {
      setIsMobile(!e.matches);
    };

    setIsMobile(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Show cursor on first movement
    const handleFirstMove = () => {
      setIsHidden(false);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    // Track mouse position and translate wrappers instantly with ZERO delay
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (dotWrapperRef.current) {
        dotWrapperRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Track hover states for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.closest('a, button, input, select, textarea, [role="button"], .clickable, .glass-card, [onclick]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.closest('a, button, input, select, textarea, [role="button"], .clickable, .glass-card, [onclick]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Mouse click visual feedback
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide cursor when leaving screen
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleFirstMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Global CSS to hide default cursor and define keyframe pulsing */}
      <style>{`
        @media (pointer: fine) {
          body, html, a, button, input, select, textarea, [role="button"], .clickable {
            cursor: none !important;
          }
        }
        @keyframes halo-pulse {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.95;
          }
        }
        .animate-halo-pulse {
          animation: halo-pulse 1.8s infinite ease-in-out;
        }
      `}</style>

      {/* Inner Dot Wrapper - Translates instantly */}
      <div
        ref={dotWrapperRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Visual Dot - Transitions size & scale on hover */}
        <div
          className={`transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#8CFF00] rounded-full mix-blend-screen transition-all duration-300 ease-out ${
            isHovered ? 'scale-[1.8] shadow-[0_0_15px_#8CFF00]' : 'shadow-[0_0_6px_rgba(140,255,0,0.5)]'
          } ${isClicked ? 'scale-75' : ''}`}
        />
      </div>

      {/* Outer Ring Wrapper - Translates instantly */}
      <div
        ref={ringWrapperRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Scale/Hover Container - Smooth transition for hover scaling */}
        <div
          className={`transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
            isHovered ? 'scale-150' : 'scale-100'
          } ${isClicked ? 'scale-[0.85]' : ''}`}
        >
          {/* Pulsing Ring - Infinite CSS scaling animation centered perfectly */}
          <div
            className={`w-10 h-10 border rounded-full mix-blend-screen animate-halo-pulse transition-all duration-300`}
            style={{
              borderColor: isHovered ? 'rgba(140, 255, 0, 0.6)' : 'rgba(255, 255, 255, 0.3)',
              backgroundColor: isHovered ? 'rgba(140, 255, 0, 0.05)' : 'transparent',
              boxShadow: isHovered ? '0 0 20px rgba(140, 255, 0, 0.15)' : 'none',
              borderWidth: isHovered ? '1px' : '1px'
            }}
          />
        </div>
      </div>
    </>
  );
}
