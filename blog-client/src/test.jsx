import React, { useState, useEffect, useRef } from 'react';

const FadeInComponent = ({ children, delay = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Force the browser to acknowledge the initial state
    if (elementRef.current) {
      // This forces a reflow, ensuring initial styles are applied
      elementRef.current.getBoundingClientRect();
    }
    
    // Small timeout to ensure initial styles are painted
    const renderTimer = setTimeout(() => {
      setShouldRender(true);
    }, 0);

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(renderTimer);
      clearTimeout(visibilityTimer);
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: shouldRender ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : 'none',
        // Ensure initial state is always hidden
        visibility: shouldRender ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

// Alternative Solution using CSS classes
const FadeInComponentCSS = ({ children, delay = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`fade-in-wrapper ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Demo Component
export default function App() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="p-8">
      <style>{`
        .fade-in-wrapper {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .demo-card {
          padding: 20px;
          margin: 10px 0;
          background: #f0f0f0;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>

      <button 
        onClick={() => setShowComponents(!showComponents)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Components
      </button>

      {showComponents && (
        <>
          <h3 className="text-lg font-semibold mb-4">Fixed Solution (with forced reflow):</h3>
          <FadeInComponent delay={50}>
            <div className="demo-card">Component 1 - 50ms delay</div>
          </FadeInComponent>
          <FadeInComponent delay={150}>
            <div className="demo-card">Component 2 - 150ms delay</div>
          </FadeInComponent>
          <FadeInComponent delay={250}>
            <div className="demo-card">Component 3 - 250ms delay</div>
          </FadeInComponent>

          <h3 className="text-lg font-semibold mb-4 mt-8">CSS Class Solution:</h3>
          <FadeInComponentCSS delay={50}>
            <div className="demo-card">Component A - 50ms delay</div>
          </FadeInComponentCSS>
          <FadeInComponentCSS delay={150}>
            <div className="demo-card">Component B - 150ms delay</div>
          </FadeInComponentCSS>
          <FadeInComponentCSS delay={250}>
            <div className="demo-card">Component C - 250ms delay</div>
          </FadeInComponentCSS>
        </>
      )}
    </div>
  );
}