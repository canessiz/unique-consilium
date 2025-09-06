import '@testing-library/jest-dom';

// Minimal ResizeObserver mock for jsdom
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore
global.ResizeObserver = RO as any;
