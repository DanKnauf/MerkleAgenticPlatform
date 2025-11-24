import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';
import type { DemoAction } from '@/types';

const GuidedDemo: React.FC = () => {
  const navigate = useNavigate();
  const { isDemo, currentScene, currentActionIndex, nextAction, skipDemo } = useDemo();
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const currentAction: DemoAction | undefined =
    currentScene?.actions[currentActionIndex];

  useEffect(() => {
    if (!isDemo || !currentAction) return;

    const timer = setTimeout(() => {
      handleAction(currentAction);
    }, 500);

    return () => clearTimeout(timer);
  }, [isDemo, currentActionIndex]);

  const handleAction = (action: DemoAction) => {
    switch (action.type) {
      case 'navigate':
        if (action.target) {
          navigate(action.target);
        }
        setTimeout(() => nextAction(), action.duration || 1000);
        break;

      case 'highlight':
        if (action.target) {
          const element = document.querySelector(action.target) as HTMLElement;
          if (element) {
            setHighlightedElement(element);
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        setTimeout(() => {
          setHighlightedElement(null);
          nextAction();
        }, action.duration || 3000);
        break;

      case 'tooltip':
      case 'wait':
        setTimeout(() => nextAction(), action.duration || 2000);
        break;

      default:
        nextAction();
    }
  };

  if (!isDemo || !currentAction) return null;

  const getHighlightPosition = () => {
    if (!highlightedElement) return null;
    const rect = highlightedElement.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  const highlightPos = getHighlightPosition();

  return (
    <AnimatePresence>
      {isDemo && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-[9998]"
            onClick={skipDemo}
          />

          {/* Highlight Box */}
          {highlightPos && highlightedElement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: highlightPos.top - 8,
                left: highlightPos.left - 8,
                width: highlightPos.width + 16,
                height: highlightPos.height + 16,
                zIndex: 9999,
                pointerEvents: 'none',
              }}
              className="border-4 border-merkle-primary rounded-lg shadow-2xl"
            />
          )}

          {/* Tooltip Message */}
          {(currentAction.type === 'tooltip' || currentAction.type === 'highlight') && currentAction.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: currentAction.position?.y
                  ? `${currentAction.position.y}%`
                  : highlightPos
                    ? highlightPos.top + highlightPos.height + 20
                    : '50%',
                left: currentAction.position?.x
                  ? `${currentAction.position.x}%`
                  : highlightPos
                    ? highlightPos.left + highlightPos.width / 2
                    : '50%',
                transform: currentAction.position?.x
                  ? 'translateX(-50%)'
                  : highlightPos
                    ? 'translateX(-50%)'
                    : 'translate(-50%, -50%)',
                zIndex: 10000,
                maxWidth: '500px',
              }}
              className="bg-white rounded-xl shadow-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentScene?.title}
                  </h3>
                  <p className="text-gray-700">{currentAction.message}</p>
                </div>
                <button
                  onClick={skipDemo}
                  className="ml-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    Step {currentActionIndex + 1} of {currentScene?.actions.length}
                  </div>
                  <div className="flex space-x-1">
                    {currentScene?.actions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentActionIndex
                            ? 'w-6 bg-merkle-primary'
                            : idx < currentActionIndex
                            ? 'w-1.5 bg-merkle-primary'
                            : 'w-1.5 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setHighlightedElement(null);
                    nextAction();
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Skip Demo Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={skipDemo}
            className="fixed top-6 right-6 z-[10001] bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Skip Demo</span>
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
};

export default GuidedDemo;
