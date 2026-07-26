# Accredian Enterprise — Next.js Landing Page Partial Clone

A modern, responsive, high-performance partial clone of [enterprise.accredian.com](https://enterprise.accredian.com/) built using **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🎯 Objective & Evaluation Scope

Recreate the Accredian Enterprise landing page with clean architecture, reusable components, smooth navigation, and a full-stack lead capture API system.

### ✅ Mandatory & Bonus Requirements Completed

- [x] **Landing Page Sections (All 13 Sections Implemented)**
  1. `#home` — **Hero Banner**: Headline, value bullets, dual CTAs, and live cohort dashboard graphic.
  2. `#stats` — **Track Record**: Animated count-up metrics for 10K+ professionals, 200+ partners, 5K+ projects, 98% satisfaction rate.
  3. `#clients` — **Proven Partnerships**: Infinite 60 FPS GPU-accelerated marquee logo strip.
  4. `#edge` — **Accredian Edge**: 4 strategic training pillars with icons & ROI metrics.
  5. `#domains` — **7 Domain Specializations**: GenAI & LLMs, Product Management, Data Science, Executive Leadership, BI, Full-Stack, Cybersecurity.
  6. **Course Segmentation Matrix**: 5-tab filtering matrix (Program Type, Sector, Topic, Level, Cohort).
  7. **Who Should Join**: 4 target audience persona cards with organizational outcomes.
  8. `#cat` — **CAT Framework**: 3-stage methodology (Competency Mapping → Applied Action Learning → Impact Analytics).
  9. `#how-it-works` — **Execution Model**: 3-step delivery timeline.
  10. `#faqs` — **FAQ Accordion**: Category tabs ("About Course", "Delivery & Format", "Enterprise & Pricing") with smooth accordion toggles.
  11. `#testimonials` — **Testimonials**: Client reviews carousel with star ratings and reviewer credentials.
  12. `#contact` — **Contact & Lead Form**: Enterprise contact details + Lead capture form.
  13. **Footer**: Navigation links, program links, address, and legal copyright bar.

- [x] **Navigation & Shell**
  - Sticky header with `backdrop-blur-md` and shadow transition on scroll.
  - Custom `useScrollSpy` hook with `getBoundingClientRect` for pixel-accurate active link highlighting.
  - Responsive mobile drawer navigation with body scroll locking and smooth anchor scrolling.

- [x] **API Integration & Bonus Features**
  - **`GET /api/enterprise-data`**: API route serving centralized enterprise data JSON.
  - **`POST /api/leads`**: API route receiving, validating, and storing lead capture submissions.
  - **Interactive Lead Form**: Full client & server-side input validation, error messaging, loading state, and success toast confirmation.

- [x] **Scroll-Triggered Animations**
  - Custom `useInView` hook using `IntersectionObserver` for efficient scroll detection.
  - `AnimateOnScroll` wrapper component with 6 animation variants (`fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade`, `zoom`).
  - Staggered per-card cascade animations (Stats: 120ms, Edge: 100ms, Domains: 80ms delays).
  - GPU-optimized with `willChange` cleanup after animation completes.

- [x] **Automated API Test Suite**
  - 11 tests covering `GET /api/enterprise-data` validation, `POST /api/leads` input rejection (empty body, bad email, short phone, missing company), success flow, and lead count verification.
  - Run with `npm test` (requires dev server running).

---

## 🛠️ Tech Stack & Architecture Decisions

| Technology | Purpose | Rationale |
|---|---|---|
| **Next.js 15 (App Router)** | Framework | Server Components, App Router API routes, and optimized build pipeline |
| **TypeScript** | Type Safety | Strict type definitions for data models (`NavLink`, `DomainCard`, `FAQItem`, `LeadPayload`) |
| **Tailwind CSS v4** | Styling | Utility-first responsive design, custom `@theme` tokens, and hardware-accelerated keyframe animations |
| **Poppins Font** | Typography | Official font matching `enterprise.accredian.com` loaded via `next/font/google` |
| **React Hooks & Memo** | State & Perf | `useScrollSpy`, `useInView`, `useState`, `useCallback`, `useMemo`, and `React.memo` optimizations |
| **IntersectionObserver** | Scroll Animations | Zero-dependency scroll-triggered entrance animations via `useInView` hook |
| **Vercel** | Deployment | Native zero-config deployment platform for Next.js |

---

## 📁 Project Structure

```
accredian-enterprise/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── enterprise-data/
│   │   │   │   └── route.ts       # GET — Serves enterprise data JSON
│   │   │   └── leads/
│   │   │       └── route.ts       # POST — Validates & stores lead submissions
│   │   ├── globals.css            # Tailwind directives + GPU hardware keyframes
│   │   ├── layout.tsx             # Root layout, Poppins font, SEO metadata
│   │   └── page.tsx               # Main page composing all 13 sections
│   ├── __tests__/
│   │   └── api.test.ts            # 11-test API route test suite
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky header, scrollspy, mobile drawer
│   │   │   └── Footer.tsx         # Site footer with navigation & contact
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Main banner with dashboard graphic
│   │   │   ├── Stats.tsx          # Track record with animated count-up
│   │   │   ├── Clients.tsx        # Infinite marquee partner logos
│   │   │   ├── AccredianEdge.tsx  # 4 strategic training pillars
│   │   │   ├── DomainExpertise.tsx# 7 domain cards with skills chips
│   │   │   ├── CourseSegmentation.tsx # Tabbed course matrix
│   │   │   ├── WhoShouldJoin.tsx  # Audience persona cards
│   │   │   ├── CATFramework.tsx   # 3-stage learning methodology
│   │   │   ├── HowItWorks.tsx     # 3-step delivery process timeline
│   │   │   ├── FAQ.tsx            # Categorized FAQ accordion
│   │   │   ├── Testimonials.tsx   # Reviews carousel with star ratings
│   │   │   └── ContactCTA.tsx     # Contact info + LeadForm wrapper
│   │   ├── shared/
│   │   │   └── Container.tsx      # Reusable max-width layout container
│   │   └── ui/
│   │       ├── AnimateOnScroll.tsx # Scroll-triggered animation wrapper (6 variants)
│   │       ├── Button.tsx         # Reusable button primitive
│   │       ├── Card.tsx           # Reusable card wrapper with hover effects
│   │       ├── SectionHeading.tsx # Reusable section titles & badges
│   │       ├── AccordionItem.tsx  # Accessible accordion item
│   │       └── LeadForm.tsx       # Interactive lead capture form
│   ├── hooks/
│   │   ├── useScrollSpy.ts       # RAF-throttled scroll position tracker
│   │   └── useInView.ts          # IntersectionObserver hook for scroll animations
│   ├── lib/
│   │   ├── data/
│   │   │   └── enterprise.ts     # Centralized mock data layer
│   │   └── types/
│   │       └── index.ts          # Shared TypeScript interfaces
├── public/
│   └── images/                    # Partner logos, hero illustration, avatars
├── .env.local                     # Environment variables (partner URLs, API paths)
├── .env.example                   # Template for environment variables
└── README.md
```

---

## ⚡ Local Setup & Development Instructions

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Steps to Run Locally

1. **Navigate to Project Directory**:
   ```bash
   cd accredian-enterprise
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Start Development Server**:
   ```bash
   npm run dev -- -p 8080
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

5. **Run API Tests** (requires dev server running):
   ```bash
   npm test
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

7. **Start Production Server**:
   ```bash
   npm run start -- -p 8080
   ```

---

## 🧪 Automated Test Suite

Run the API route test suite (requires the dev server to be running):

```bash
npm test
```

**Test Results (11/11 passing)**:
```
🧪 API Route Test Suite
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📡 GET /api/enterprise-data
  ✅ returns 200 status
  ✅ returns valid JSON with success: true
  ✅ contains all required data keys
  ✅ navLinks is an array with 9 navigation items
  ✅ stats contains 4 metric items

📡 POST /api/leads (Validation)
  ✅ rejects empty body with 400
  ✅ rejects invalid email format
  ✅ rejects short phone number
  ✅ rejects missing company name

📡 POST /api/leads (Success Flow)
  ✅ accepts valid lead and returns 201 with leadId

📡 GET /api/leads (Count Verification)
  ✅ returns totalLeads >= 1 after submission

🏁 Results: 11 passed, 0 failed, 11 total
```

---

## 🔌 API Endpoints

### 1. GET `/api/enterprise-data`
Returns the complete data structure of all 13 sections in JSON format.

**Response**:
```json
{
  "success": true,
  "timestamp": "2026-07-25T17:35:54.000Z",
  "data": {
    "navLinks": [...],
    "hero": {...},
    "stats": [...],
    "clients": [...],
    "edge": [...],
    "domains": [...],
    "segmentation": {...},
    "audience": [...],
    "catFramework": [...],
    "howItWorks": [...],
    "faqs": [...],
    "testimonials": [...],
    "contact": {...}
  }
}
```

### 2. POST `/api/leads`
Receives, validates, and stores corporate lead capture submissions.

**Request Payload**:
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "+91 98765 43210",
  "company": "Acme Corp",
  "designation": "VP of Engineering",
  "teamSize": "10-25 learners",
  "message": "Interested in GenAI corporate training cohort."
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Enquiry submitted successfully! Our enterprise consultant will get in touch shortly.",
  "leadId": "lead_1721928000_x9a1"
}
```

**Validation Error (400)**:
```json
{
  "success": false,
  "error": "Invalid email format."
}
```

---

## 🎬 Scroll-Triggered Animations

All sections (except Hero, which loads instantly) use `AnimateOnScroll` wrappers powered by the custom `useInView` hook.

| Variant | Effect | Used In |
|---|---|---|
| `fade-up` | Fade + slide up 32px | Stats, Edge, Domains, FAQ, How It Works |
| `fade` | Pure opacity fade | Clients marquee |
| `zoom` | Fade + scale from 92% | Contact CTA |

**Staggered card animations** create a premium cascade reveal effect:
- Stats cards: 120ms per-card delay
- Edge pillars: 100ms per-card delay
- Domain cards: 80ms per-card delay

---

## 🤖 Where AI Helped

In accordance with submission guidelines, here is a transparent breakdown of how AI assisted during the development lifecycle:

| Area | How AI Helped |
|---|---|
| **Website & Bundle Analysis** | AI analyzed the live `enterprise.accredian.com` JS/CSS bundles to map all 13 section components, navigation anchors, typography, and color tokens accurately. |
| **Architecture & Plan Synthesis** | AI designed the 6-step incremental development plan, merging section accuracy with TypeScript architectural best practices. |
| **Mock Data Extraction** | AI extracted and structured site content into typed TypeScript data models inside `lib/data/enterprise.ts`. |
| **Code & Performance Optimization** | AI assisted in implementing GPU hardware acceleration, throttled `requestAnimationFrame` scrollspy hooks, IntersectionObserver scroll animations, and React state update deduplication. |
| **Scroll Animation System** | AI built the `useInView` hook and `AnimateOnScroll` wrapper with 6 animation variants and staggered card cascade effects. |
| **API Test Suite** | AI created the 11-test automated API route test suite covering validation, success flows, and data integrity checks. |
| **Build & Type Auditing** | AI executed build verification tests (`npm run build`) to ensure zero TypeScript or bundler errors across all phases. |

---

## 🚀 Deploying to Vercel

1. Push code to GitHub repository:
   ```bash
   git add .
   git commit -m "feat: final polish — scroll animations, test suite, README update"
   git push origin main
   ```
2. Import the repository on [Vercel](https://vercel.com/new).
3. Select `Next.js` framework preset with root directory set to `accredian-enterprise`.
4. Add environment variables from `.env.example` to Vercel project settings.
5. Click **Deploy**!

---

## 📄 License

This project was developed as part of the Accredian Enterprise Internship Assignment.
