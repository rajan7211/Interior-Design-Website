# AURELLE Interiors — Luxury Architecture & Design Website

A sophisticated, responsive, editorial website built for a premier luxury interior design studio and architecture atelier.

---

## 🏛️ Brand Overview & Aesthetic Direction

- **Brand Name**: AURELLE Interiors
- **Design Philosophy**: The Architecture of Stillness — Proportional restraint, material honesty, and natural light.
- **Palette**: Warm Ivory (`#FBF9F5`), Natural Linen/Sand (`#F2EDE4`), Dark Bronze & Charcoal (`#181716`), Muted Olive Accent (`#5D6853`).
- **Typography**: Editorial Serifs (`Cormorant Garamond`, `Cinzel`) and balanced Sans-serif (`Plus Jakarta Sans`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with bespoke luxury design tokens
- **Routing**: React Router v7 with dynamic code-splitting and lazy-loaded routes
- **Icons**: Lucide React
- **Data & State**: TanStack Query v5 + Axios
- **Form Validation**: React Hook Form + Zod v4

---

## 📄 Pages Included

1. **Home (`/`)**: Large architectural hero, quantitative studio metrics, featured works, atelier disciplines, design manifesto, 4-phase commission methodology, client testimonials, AD100 honors, and final CTA.
2. **Projects / Portfolio (`/projects`)**: Dual-tier filter (Archetype & Room focus), responsive card grid, and empty/loading states.
3. **Project Details (`/projects/:slug`)**: High-res cover, architectural metrics bar, intervention narrative, artisanal material palette, interactive fullscreen image lightbox, and next/previous project navigation.
4. **Services (`/services`)**: Full interior architecture, bespoke millwork, curated FF&E, and turnkey project management with deliverables and engagement criteria.
5. **About Studio (`/about`)**: Architecture of Stillness philosophy, founder & leadership profiles, and global atelier locations (London, New York, Paris).
6. **Contact Us (`/contact`)**: Confidential inquiry memorandum with full Zod validation and studio directory.
7. **Book a Consultation (`/consultation`)**: High-touch appointment qualification form with budget brackets, spatial dimensions, preferred calendar dates, and time slot selection.
8. **Custom 404 (`*`)**: Minimalist luxury 404 page with return actions.
9. **Admin Login (`/admin/login`)**: Sleek portal login with pre-configured demo credentials.
10. **Admin Dashboard (`/admin/dashboard`)**:
   - Executive studio metrics
   - Portfolio management (Create/Edit modal, publish toggle, feature toggle, delete)
   - Client inquiry pipeline management (status workflow + internal director memos)
   - Consultation calendar with status updates and video meeting link assignment

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```
By default, `VITE_USE_MOCK=true` is enabled, giving you full interactive state persistence via localStorage without needing the backend running. When NestJS is deployed, set `VITE_USE_MOCK=false`.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Admin Demonstration Credentials

- **URL**: `http://localhost:5173/admin/login` or `http://localhost:5173/admin/dashboard`
- **Email**: `admin@aurelleinteriors.com`
- **Passphrase**: `aurelle2026`
