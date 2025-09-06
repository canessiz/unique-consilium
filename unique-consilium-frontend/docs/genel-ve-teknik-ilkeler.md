# UNIQUE CONSILIUM — Genel & Teknik İlkeler (2025, Güncel)

## 1) Genel İlkeler
- Mükemmeliyetçilik; vasata sıfır tolerans, global standart
- Kurumsal, güven veren **premium** kimlik; temiz, modern, sade ( “az çoktur” )
- Ultra hız, stabilite, sürdürülebilirlik; **kullanıcı odaklı** “2 tık kuralı”
- Tek dil: **İngilizce** (ileri aşamada çoklu dil opsiyonel)
- Referans ve **sosyal kanıt** odaklılık; **sabit ve eksiksiz sayfa seti**
- Özgün / kopyasız içerik
- **Gizlilik ve yasal uyum:** GDPR/KVKK, çerez politikası
- Kolay yönetim, sürdürülebilirlik; trafik ve maliyet bilinci
- Her adımda kalite kontrol (QA) ve yönetici onayı

---

## 2) Sabit Sayfa Listesi
- **/about** (Hakkımızda)  
- **/services** (Hizmetler)  
- **/team** (Ekip)  
- **/references** (Referanslar)  
- **/careers** (Kariyer)  
- **/contact** (İletişim)  
- **/downloads** (Döküman/Katalog İndirme)  
- **/faq** (Sıkça Sorulan Sorular)  
- **/terms** (Kullanım Koşulları)  
- **/customer-login** (Müşteri Girişi)  
- **/manufacturer-login** (Üretici Girişi)  
- **/field-sales-representative-login** (Saha Satış Temsilcisi Girişi)  
- **/consilium-principles** (Perfectionism, Professionalism, Innovation; *Reliability/Integrity/Sustainability eklenecek*)

---

## 3) Teknik Altyapı & Modüller

### 3.1) Backend Mimarisi
**Teknolojiler**
- Python **3.12.x**
- Django **5.1.x** + Django REST Framework **3.15.x**
- PostgreSQL **16.x**
- Redis **7.x** (cache & Celery broker)
- Celery **5.3.x** + Flower **2.0.x**
- Nginx **1.25.x** (reverse proxy/statik)
- Gunicorn **21.x** (WSGI) — *(ops.)* Uvicorn **0.30.x** (ASGI) gerekirse

**Konteyner & Orkestrasyon**
- Docker imajları; **Docker Compose** (dev/staging)
- Prod: **Kubernetes** (Helm chart), rolling update / autoscaling
- Private registry (GHCR/ECR/ACR), imajlar **Git SHA + semver** ile tag’lenir

**Servis Topolojisi**
- `web` (Django/DRF), `worker` (Celery), `beat` (Celery Beat), `db` (PostgreSQL), `cache` (Redis), `nginx` (proxy), *(ops.)* `flower`

**Kimlik & Güvenlik**
- Zorunlu e-posta doğrulama ve **2FA** (TOTP/SMS, django-otp)
- Brute-force önleme / **rate limiting** (nginx + app; django-axes/rate-limit)
- **WAF & DDoS**: CDN/Cloud provider (Cloudflare/AWS WAF)
- OWASP Top 10: **CSRF**, **CSP** (django-csp), **HSTS**, `SECURE_*` bayrakları
- Kimlik: **JWT** (harici istemciler) veya session — DRF SimpleJWT

**API Tasarımı**
- REST + **OpenAPI** (drf-spectacular); versiyon: `/api/v1/...`
- Standart paginasyon, filtreleme, sıralama; tutarlı hata gövdeleri
- CORS ve rate limit **environment** bazlı

**Depolama & Medya**
- S3 uyumlu obje depolama (AWS S3/MinIO) — `django-storages`
- Statik dosya: prod’da **nginx + CDN**, dev’de WhiteNoise kabul
- Yedekleme: `pg_dump` günlük; medya senkronizasyonu, **şifreli** ve **retention** politikalı

**Test & Kalite**
- `pytest` + `pytest-django`, **coverage ≥ %80** hedef
- `black`, `isort`, `flake8`, *(ops.)* `mypy`
- Pre-commit: format + lint + kritik test

**Operasyonel İzleme**
- **Sentry** (BE hataları), **Prometheus/Grafana** (metrik); JSON istek/yanıt log’ları
- Sağlık uçları: `/healthz` (liveness) / `/readyz` (readiness)

**CI/CD**
- GitHub Actions/GitLab CI:  
  1) test/lint/coverage → 2) docker build+push → 3) deploy (staging) → **onay** → prod
- Dağıtım: **Helm/ArgoCD**; migrate → collectstatic → health-check → rolling
- **Rollback**: Önceki imaj/helm revizyonuna otomatik dönüş

**Konfigürasyon**
- **12-factor**: `.env` (secret yok), secrets manager (Vault/SM/KeyVault)
- Ortamlar: `production / staging / test`
- *(ops.)* Feature flag: LaunchDarkly/Unleash

---

### 3.2) Frontend
**Framework / Runtime**
- Next.js (App Router) **v15.4.6**
- React / react-dom **v18.3.1**
- TypeScript (strict) **v5.5.4**

**UI / Design System**
- **Carbon Design System (React)**
  - `@carbon/react` **v1.89.0**
  - `@carbon/styles` **v1.88.0**
  - `@carbon/grid` **v11.41.0**
  - `@carbon/icons-react` **v11.65.0**
- **Stil İlkeleri:** Token-first SCSS, **inline stil yok**, %100 Carbon uyumu

**Durum Yönetimi**
- Redux Toolkit **v2.8.2**, react-redux **v9.2.0**  
- Öneri: **LocalStorage persistence** (örn. redux-persist)

**Form & Doğrulama**
- React Hook Form **v7.62.0** + Zod **v4.0.17**

**Animasyon**
- Framer Motion **v12.23.12**

**Veri Erişimi**
- Next.js **built-in fetch** (ekstra kütüphane yok)

**Test (kurulum)**
- Jest **v30.0.5**, React Testing Library **v16.3.0**, `jest-dom` **v6.7.0**, `user-event` **v14.6.1**

**İçerik**
- Şimdilik **statik**; Headless CMS (Strapi/Sanity/Contentful) opsiyonel

**Görsel & Performans**
- Next Image; CDN/Cloudinary opsiyonel

**SEO / Analytics / Monitoring**
- Metadata (`layout.tsx`), **sitemap** (`app/sitemap.ts`)
- Plan: `robots.txt`, **OG görseller**, GA4, **Sentry (FE)**
- *(ops.)* PWA: `next-pwa`

**Erişilebilirlik**
- Skip-to-content (Carbon sınıfları), klavye/a11y uyumu

**Bileşen & Dosya Kuralları**
- Grid: `cds--grid / cds--row / cds--col`
- SCSS: `globals.scss` + Carbon token’ları (spacing/color/type/layer/theme)
- Hariç: **Web Components**, storybook/demo, gereksiz build/coverage

---

### 3.3) DevOps & Güvenlik (FE + BE)
- Repo: **Private**
- Kalite: ESLint **8.57.1**, Prettier **3.6.2**, Husky **9.1.7** (pre-commit: lint/format/test)
- Ortamlar: `production / staging / test` (ayrı domain/URL)
- Güvenlik: OWASP, **2FA**, WAF/DDoS, rate limit, güvenli header’lar, şifreli veri, log politikası
- GDPR/KVKK: Çerez politikası, açık rıza, opt-out, **saklama süresi** ve **erişim kayıtları**

### 3.4) Yönetim & Diğer Modüller
- **Admin Panel (Backend):** Django Admin (RBAC: admin, müşteri, üretici, saha satış)
- **Kullanıcı Yönetimi:** RBAC, kapsam bazlı yetki; denetim log’ları
- **Yedekleme:** DB + medya otomatik, şifreli, retention ve **restore testi**
- **Scaling:** HPA (K8s), *(ops.)* Postgres read-replica
- **CDN:** Statik/medya için sağlayıcı CDN

---

## 4) Tasarım & Diğer İlkeler
- **Responsive** & erişilebilir (WCAG/Carbon a11y)
- Font: **IBM Plex Sans**
- Renk: Açık arka plan, marka mavisi (**Carbon brand tokens**)
- Logo: Profesyonel/özgün
- Dil: Şu an tek dil (**EN**); i18n opsiyonel
- Tema: Carbon tema (**g10/g90/g100**), **ThemeSwitcher** mevcut
- Bileşen Kullanımı: IBM Carbon bileşenleri, **token-first SCSS**, **inline stil yok**

---

## 5) Sürüm Matrisi (2025)

### 5.1) Frontend
- Next.js (App Router) **15.4.6**
- React / react-dom **18.3.1**
- TypeScript **5.5.4**
- `@carbon/react` **1.89.0**
- `@carbon/styles` **1.88.0**
- `@carbon/grid` **11.41.0**
- `@carbon/icons-react` **11.65.0**
- `@reduxjs/toolkit` **2.8.2** — `react-redux` **9.2.0**
- `react-hook-form` **7.62.0** — `zod` **4.0.17**
- `framer-motion` **12.23.12**
- **ESLint 8.57.1** — **Prettier 3.6.2** — **Husky 9.1.7**
- **Jest 30.0.5** — **@testing-library/react 16.3.0** — `jest-dom 6.7.0` — `user-event 14.6.1`

### 5.2) Backend
- Python **3.12.x**
- Django **5.1.x** — Django REST Framework **3.15.x**
- PostgreSQL **16.x** — `psycopg 3.1.x`
- Redis **7.x**
- Celery **5.3.x** — Flower **2.0.x**
- Gunicorn **21.x** — *(ops.)* Uvicorn **0.30.x** (ASGI worker)
- Nginx **1.25.x**
- `django-storages 1.14.x` — `boto3 1.34.x` (S3)
- `drf-spectacular 0.27.x` (OpenAPI)
- `django-csp 3.7.x` — `django-axes 6.1.x` — `django-otp 1.3.x`
- `pytest 8.x` — `pytest-django 4.x` — `coverage 7.x`
- `black 24.x` — `isort 5.13.x` — `flake8 7.x` — *(ops.)* `mypy 1.10+`
- Docker Engine **24+** — Docker Compose **v2.27+**
- Kubernetes **1.29+** — Helm **3.14+** — *(ops.)* ArgoCD **2.10+**
- Sentry SDK **1.39+** — `prometheus-client 0.20+`

> **Not:** Sürüm numaraları **pin/hedef** olarak tanımlıdır; **patch** güncellemeleri (x.y.*) otomatik uygulanabilir. **Minor/Major** değişiklikleri için **onay zorunludur**.

---
