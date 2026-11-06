import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

/**
 * Responsive Root Frame
 * Renders the application directly across mobile, tablet, and desktop viewports
 * without simulated device shells or artificial borders.
 */
export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] text-[#1E201E] flex flex-col selection:bg-[#A64F36] selection:text-white">
      {children}
    </div>
  );
}
