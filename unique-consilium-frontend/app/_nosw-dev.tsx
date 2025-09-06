"use client";
import { useEffect } from 'react';

export default function NoSWDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    (async () => {
      try {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) await r.unregister();
        }
      } catch {/* ignore */}
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
      } catch {/* ignore */}
      try {
        const build = document.querySelector('footer.uc-footer')?.getAttribute('data-footer-build');
        // eslint-disable-next-line no-console
        console.info('[UC] SW off, caches cleared. footer build:', build);
      } catch {/* ignore */}
    })();
  }); // run on every render/HMR
  return null;
}
