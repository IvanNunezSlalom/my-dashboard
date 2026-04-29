import React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-content mx-auto px-10 py-10">
        {children}
      </div>
    </main>
  );
};
