import React, { createContext, useContext, useState, useCallback } from 'react';
import type { DemoScene, DemoAction } from '@/types';

interface DemoContextType {
  isDemo: boolean;
  currentScene: DemoScene | null;
  currentActionIndex: number;
  startDemo: (scene: DemoScene) => void;
  stopDemo: () => void;
  nextAction: () => void;
  skipDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemo, setIsDemo] = useState(false);
  const [currentScene, setCurrentScene] = useState<DemoScene | null>(null);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const startDemo = useCallback((scene: DemoScene) => {
    setIsDemo(true);
    setCurrentScene(scene);
    setCurrentActionIndex(0);
  }, []);

  const stopDemo = useCallback(() => {
    setIsDemo(false);
    setCurrentScene(null);
    setCurrentActionIndex(0);
  }, []);

  const nextAction = useCallback(() => {
    if (!currentScene) return;

    if (currentActionIndex < currentScene.actions.length - 1) {
      setCurrentActionIndex(prev => prev + 1);
    } else {
      stopDemo();
    }
  }, [currentScene, currentActionIndex, stopDemo]);

  const skipDemo = useCallback(() => {
    stopDemo();
  }, [stopDemo]);

  return (
    <DemoContext.Provider
      value={{
        isDemo,
        currentScene,
        currentActionIndex,
        startDemo,
        stopDemo,
        nextAction,
        skipDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
