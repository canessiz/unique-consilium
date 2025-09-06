Frontend Altyapısı — Üretim Kılavuzu (2025, Güncel)
1) Proje Kurulumu ve Altyapı

Next.js (App Router, TypeScript)

Kurulum: Next.js 15.4.6 (App Router) + React 18.3.1 + TypeScript 5.5.4 (strict)

next.config.js mevcut.

Opsiyonel: PWA ve gelişmiş cache için next-pwa entegrasyonu (production için ayrı build profili).

Carbon + SCSS (%100 Carbon uyumlu sistem)

Tüm layout/spacing/tipografi/renkler Carbon Design System token’ları ile yönetilir (token-first).

Grid: @carbon/grid 11.41.0 (sınıflar: cds--grid, cds--row, cds--col).

Stil katmanı: @carbon/styles 1.88.0 (SCSS) + app/globals.scss.

Not: Sass uyarıları giderildi; sass:meta ile meta.variable-exists kullanımı (deprecated global fonksiyon yok).

Carbon Design System (React)

Bileşenler: @carbon/react 1.89.0, ikonlar: @carbon/icons-react 11.65.0.

IBM’deki “AI” menüsü yerine Consilium Principles yapısı.

Navbar: Carbon Header üzerinde ARIA/a11y uyumlu mega panel tetikleyicileri.

Redux Toolkit

Global state (tema dahil): @reduxjs/toolkit 2.8.2, react-redux 9.2.0.

Öneri: LocalStorage persistence (örn. redux-persist) ile kullanıcı ayarlarını kalıcı kıl.

ESLint & Prettier

ESLint 8.57.1, Prettier 3.6.2 aktif; proje kuralları .eslint* ve .prettier* ile tanımlı.

Husky (pre-commit)

Husky 9.1.7. Pre-commit’te prettier --check + eslint --max-warnings=0 (opsiyonel: jest-related tests).

Konfigürasyon Dosyaları

tsconfig.json, next.config.js, eslint.config.mts, postcss.config.cjs, README.md.

Dil Desteği

Şu an tek dil: İngilizce. Gelecekte i18n opsiyonel.

2) Klasör & Dosya Yapısı

Kurumsal, ölçeklenebilir mimari.

app/ altında tek dil (EN) ile tüm kurumsal sayfalar:
about, services, team, references, careers, contact, downloads, faq, terms,
customer-login, manufacturer-login, field-sales-representative-login.

Ortak yapı: layout.tsx, globals.scss.

Yeni: utils/formSchema.ts (Zod validasyon şeması).

Consilium Principles: app/consilium-principles/ klasörü mevcut.

Canlı sayfalar: perfectionism/page.tsx, professionalism/page.tsx, innovation/page.tsx.

Eklenecek (route stub): reliability/, integrity/, sustainability/.

Durum: not-found.tsx ve error.tsx mevcut.

Öneri: loading.tsx eklensin.

SEO: app/sitemap.ts mevcut.

Öneri: public/ altına manifest.json, robots.txt, OG görselleri eklensin.

Base URL: https://unique-consilium.com

3) Kurumsal Sayfa ve Login Mimarisi

Tüm ana kurumsal sayfalar tek tek kodlandı.

Login sayfaları: Müşteri, Üretici, Saha Satış için ayrı sayfalar.

Consilium Principles: 3 ilke canlı, 3 ilke sırada (route + içerik).

ContactForm.tsx: RHF + Zod ile gerçek zamanlı validasyon, hatada ilk alana odak.

Öneri: Login formlarına da RHF + Zod eklenmesi.

Öneri: Form submit sonrası yönlendirme ve hata yönetimi standartlaştırılsın.

4) Bileşenler ve UI Katmanı

Ana bileşenler: Button, Card, Badge, Loader, Modal, Input, CookieBar, SEO,
SectionTitle, ThemeSwitcher, MainGrid, Navbar, Footer, ContactForm.

ThemeSwitcher: Açık/Koyu tema (Carbon theme uyumlu, toggle semantics: aria-pressed).

Navbar: “AI” kaldırıldı; yerine Consilium Principles

Mega panel tetikleyicileri: Perfectionism / Professionalism / Innovation (canlı),
Reliability / Integrity / Sustainability (eklenecek).

Öneri: Notification/Toast (Carbon InlineNotification / ToastNotification) ile global feedback mimarisi.

Öneri: Bileşenleri atomik tasarıma göre yeniden grupla (atoms/molecules/organisms) — dosya adlarını değiştirmeden.

5) Çoklu Dil (i18n)

Şu an tek dil (EN).

Opsiyonel: next-intl veya react-i18next entegrasyonu (şimdilik ekleme).

6) State Management & Hooks

Tema ve global durum: Redux Toolkit 2.8.2.

store/ içinde slice, provider, hooks mevcut.

hooks/useIsMounted.ts mevcut.

Öneri: useDebounce, useOnClickOutside yardımcı hook’ları.

Öneri: Redux persistence (tercihler/tema).

7) Yardımcı Kütüphaneler & Test Altyapısı

utils/ altında yardımcı fonksiyonlar (capitalize.ts, utils.ts) + test iskeletleri.

Yeni: formSchema.ts (Zod ile form validasyonu).

ESLint + Prettier + Husky aktif.

tests/ klasörü var; içerik henüz eklenmedi.

Öneri: Jest 30.0.5 + React Testing Library 16.3.0 ile kritik bileşen/form testleri (coverage hedefi belirleyin).

8) Statik Dosyalar & Marka Kimliği

public/ içinde favicon.ico, logo.svg mevcut.

Eksik (eklenecek): OG/social görselleri, manifest.json, robots.txt, katalog PDF’leri.

Öneri: public/docs/ altında PDF kataloglar.

Not: layout.tsx metadata’da manifest: '/manifest.json'; dosya eklendiğinde otomatik devreye girer.

9) Kurumsal Teknik İlkeler ve IBM/Carbon Uyumu

%100 Carbon uyumu; token-first SCSS, inline stil yok.

Responsive & erişilebilir (WCAG/Carbon a11y).

Tipografi: IBM Plex Sans.

Erişilebilirlik notları:

Skip link: className="cds--skip-to-content" (globals ile hizalı).

visually-hidden yardımcı sınıfı (SR-only) mevcut.

Mega panel klavye navigasyonu: Arrow/ESC/dışa tıkla kapat.

Öneri: Lighthouse + axe-core erişilebilirlik taramaları düzenli.

10) Eksikler & Yol Haritası (Öncelik Sırası)

SEO & App Meta

manifest.json, robots.txt, OG görselleri, sitemap doğrulaması (base: https://unique-consilium.com).

Consilium Principles içerikleri

Reliability / Integrity / Sustainability route + içerik.

Bildirim Sistemi

Carbon Toast/InlineNotification ile global feedback.

Testler

Jest + RTL ile kritik akışlar; coverage hedefi.

Performans

next/image optimizasyonu + CDN, prerender stratejileri.

State Persistence

Tema/tercihler için Redux persistence.

PWA (opsiyonel)

next-pwa ile offline/cache-first senaryolar.

Sürüm Özeti (Frontend)

Next.js 15.4.6 (App Router)

React 18.3.1

TypeScript 5.5.4

@carbon/react 1.89.0 · @carbon/styles 1.88.0 · @carbon/grid 11.41.0 · @carbon/icons-react 11.65.0

Redux Toolkit 2.8.2 · react-redux 9.2.0

React Hook Form 7.62.0 · Zod 4.0.17

ESLint 8.57.1 · Prettier 3.6.2 · Husky 9.1.7

Jest 30.0.5 · @testing-library/react 16.3.0

Not: Sürüm numaraları pin/hedef değerlerdir; patch güncellemeleri otomatik uygulanabilir; minor/major değişiklikler için onay zorunludur.

Kodlama İlkeleri (Uygulama)

İzin verilen import örnekleri:

import { Header, HeaderName } from '@carbon/react';
import '@carbon/styles/css/styles.css';
import '@carbon/grid';


Grid kullanımı:

<div className="cds--grid">
  <div className="cds--row">
    <div className="cds--col cds--col-sm-4 cds--col-lg-8">...</div>
    <div className="cds--col cds--col-sm-4 cds--col-lg-8">...</div>
  </div>
</div>


SCSS (token-first, inline style YASAK):

@use '@carbon/styles/scss/themes' as *;
@use '@carbon/styles/scss/type' as *;
@use '@carbon/grid';

.page-section {
  @include type-style('body-01');
  padding-block: $spacing-07;
}


Yasaklar (Copilot dikkat):

@carbon/web-components yasak (WC kodu yok; yalnız fikir alınabilir).

Tailwind yasak.

Inline style, UI token’larını atlayan renk/font/hizalama yasak.

storybook/, demo/, gereksiz test/ci klasörleri eklenmez.

Edit Modu (Copilot)

Minimal diff.

Sadece istenen dosyaya dokun.

Mevcut public API ve dosya adları korunur.

Prompt Başlığı (Her Copilot isteğinin başına ekle)
WORKSPACE & REFERENCE POLICY
Use ONLY: Next.js App Router + TypeScript + @carbon/react + @carbon/grid + Carbon SCSS tokens.
Include: @carbon/react, @carbon/grid, @carbon/styles, @carbon/icons-react, tokens (themes/layout/type).
Exclude: Web Components, storybook/demo/example code, tests/ci, node_modules, .next, dist.
Style: token-first SCSS, cds--grid/row/col; no inline styles; minimal diffs; 100% Carbon compliance.
Tailwind: DO NOT USE.

Done Checklist (PR kabul ölçütleri)

✅ Carbon token’ları ve @carbon/grid kullanıldı.

✅ Inline style YOK.

✅ Minimal diff + dosya yapısı bozulmadı.

✅ ESLint/Prettier temiz.

✅ A11y: odak sırası/ARIA/kontrast kontrol edildi.

✅ Performans: gereksiz import yok, bundle şişirmedi.

Bu kılavuz, üretim standartlarını ve Copilot guardrails’ini belirler. Copilot önerileri bu politika ile sınırlıdır.
