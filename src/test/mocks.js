import { vi } from 'vitest';

vi.mock('../logic/SoundManager', () => {
  return {
    default: {
      loadSound: vi.fn(),
      playSound: vi.fn(),
      stopSound: vi.fn(),
      toggleMute: vi.fn(),
    },
  };
});
