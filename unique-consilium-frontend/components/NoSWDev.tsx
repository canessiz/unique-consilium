'use client';
import { useEffect } from 'react';

/** Dev ortamında kayıtlı Service Worker'ları temizler. */
export default function NoSWDev() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations?.()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
    }
  }, []);
  return null;
}
