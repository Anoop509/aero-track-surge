
import { useEffect, useState } from 'react';

interface KeyboardState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

export const useKeyboardControls = (): KeyboardState => {
  const [keys, setKeys] = useState<KeyboardState>({
    up: false,
    down: false,
    left: false,
    right: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys(prev => ({ ...prev, up: true, w: true }));
          break;
        case 'arrowdown':
        case 's':
          setKeys(prev => ({ ...prev, down: true, s: true }));
          break;
        case 'arrowleft':
        case 'a':
          setKeys(prev => ({ ...prev, left: true, a: true }));
          break;
        case 'arrowright':
        case 'd':
          setKeys(prev => ({ ...prev, right: true, d: true }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          setKeys(prev => ({ ...prev, up: false, w: false }));
          break;
        case 'arrowdown':
        case 's':
          setKeys(prev => ({ ...prev, down: false, s: false }));
          break;
        case 'arrowleft':
        case 'a':
          setKeys(prev => ({ ...prev, left: false, a: false }));
          break;
        case 'arrowright':
        case 'd':
          setKeys(prev => ({ ...prev, right: false, d: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
