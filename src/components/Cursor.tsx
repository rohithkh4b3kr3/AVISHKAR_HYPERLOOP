import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    // Only run on devices with fine pointers (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move dot instantly with hardware acceleration
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setMouseDown(true);
    const onMouseUp = () => setMouseDown(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is interactive
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    // Animation loop for smooth ring movement
    const animate = () => {
      // Lerp (Linear Interpolation) for delay effect
      // Lower factor = smoother/heavier trail (0.1 is standard smooth, 0.08 is very fluid)
      const lerpFactor = 0.1;
      
      ringX += (mouseX - ringX) * lerpFactor; 
      ringY += (mouseY - ringY) * lerpFactor;

      if (ringRef.current) {
        // Use translate3d to force GPU acceleration for smoother rendering
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Central Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-green-500 rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block will-change-transform"
      />
      
      {/* Trailing Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 border border-green-500 rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-500 ease-out will-change-transform
          ${hovered ? 'w-16 h-16 bg-green-500/20 border-transparent blur-[1px]' : 'w-8 h-8 opacity-60'}
          ${mouseDown ? 'scale-75 bg-green-500/40' : 'scale-100'}
        `}
      />
    </>
  );
};