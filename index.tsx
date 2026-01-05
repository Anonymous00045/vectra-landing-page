import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NotFound from './components/NotFound';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use replaceState to fix the current history entry instead of pushing a new one
    // This helps if we are in a weird state. 
    // We navigate to the root relative to the current domain/path context if possible, 
    // but for this fix we'll just simulate a successful navigation to home state.
    const homePath = window.location.pathname.replace(/\/404\/?$/, '') || '/';
    try {
      window.history.pushState({}, '', homePath);
    } catch (err) {
      console.warn("Navigation history update failed due to environment restrictions", err);
    }
    setCurrentPath(homePath);
  };

  // Lenient Routing:
  // Only show 404 if the URL explicitly contains '404' or a known error path.
  // This solves the issue where preview environments (like /preview/xyz/) were triggering the strict 404 check.
  const is404 = currentPath.includes('/404');

  return (
    <React.StrictMode>
      {is404 ? <NotFound onBack={handleGoHome} /> : <App />}
    </React.StrictMode>
  );
};

root.render(<Router />);