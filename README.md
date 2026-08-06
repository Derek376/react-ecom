# react-ecom

[![Frontend CI](https://github.com/Derek376/react-ecom/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Derek376/react-ecom/actions/workflows/frontend-ci.yml)

Portfolio-grade e-commerce frontend built with React. It covers the complete
customer journey—from product discovery to verified Stripe checkout—plus
role-aware admin and seller dashboards.

Backend API: **[sb-ecom](https://github.com/Derek376/sb-ecom)** (Spring Boot + PostgreSQL)

---

## Live demo

| | URL |
|---|-----|
| **Storefront** | https://react-ecom-zeta.vercel.app |
| **API docs (Swagger)** | https://p01--sb-ecom--ccxd59t2vl2x.code.run/swagger-ui/index.html |
| **Backend repo** | [Derek376/sb-ecom](https://github.com/Derek376/sb-ecom) |

> The Spring Boot API is deployed as a Docker service on Northflank.

---

## Highlights

- Responsive storefront with product grid, filters, and cart
- Auth flows with a **JWT HTTP-only cookie + CSRF protection**
- Multi-step **checkout** (address → payment method → summary → Stripe)
- **Profile** + **My Orders** for customers
- **Admin / Seller** panels (products, categories, orders, sellers, analytics)
- Stable URL-driven dashboard pagination and explicit server-backed sorting
- Cloudinary product images with client-side type and size validation
- Route-level code splitting, loading/error states, automated tests, and CI
- Deployed on **Vercel** against a live Spring Boot API on **Northflank** + **Neon** Postgres

---

## Screenshots / demo flow

Suggested walkthrough for reviewers:

1. Open the live storefront → browse **Products**
2. Register / log in as a normal user → add items → **Checkout**
3. Open the avatar menu → **My Profile** / **My Orders**
4. Log in as admin → **Admin Panel** (categories, products, orders)

---

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 19, Vite 8 |
| State | Redux Toolkit |
| Routing | React Router 8 |
| Styling | Tailwind CSS 4, Material UI 9 |
| HTTP | Axios (`withCredentials` + CSRF interceptor) |
| Forms | React Hook Form |
| Payments | Stripe React / Stripe.js (test mode) |
| UX | React Hot Toast, Swiper, skeletons |
| Testing | Vitest, React Testing Library, jsdom |
| Delivery | Vercel, GitHub Actions |

---

## Features

### Storefront
- Home hero + featured products
- Product listing with pagination, category & keyword filters
- Product detail modal, add to cart
- Cart with quantity controls (local persistence + server sync at checkout)

### Account
- Register / login / logout
- Shipping address management (scoped to the logged-in user)
- Profile page (username, email, roles)
- My Orders (order history for the current user)

### Checkout & payments
- Address selection → payment method → order summary
- Stripe Payment Element + redirect confirmation
- Client secret requests are deduplicated and expose a recoverable retry state
- PayPal option shown as unavailable (UI placeholder)

### Admin / Seller
- Dashboard analytics (admin)
- Manage categories, products, and Cloudinary images
- Manage sellers (admin)
- View / update order status
- Sort and paginate products, categories, orders, and sellers with URL-persisted table state

### Quality and performance
- Route-level `lazy()` loading with a shared Suspense fallback
- Deliberate loading, empty, and error states for dashboard data
- Product image validation before upload (JPEG, PNG, WebP; maximum 5 MB)
- Reducer, routing, cart, formatting, and dashboard-query regression tests
- ESLint, tests, and production build enforced by GitHub Actions

---

## Quick start (local)

### Prerequisites

- Node.js 22.22+
- Running [sb-ecom](https://github.com/Derek376/sb-ecom) on `http://localhost:8080`

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env`:

```env
VITE_BACK_END_URL=http://localhost:8080
VITE_FRONTEND_URL=http://localhost:5173
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

| Variable | Description |
|----------|-------------|
| `VITE_BACK_END_URL` | API origin **without** `/api` (client appends `/api`) |
| `VITE_FRONTEND_URL` | Used as Stripe `return_url` base |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable test key |

### 3. Dev server

```bash
npm run dev
```

App: **http://localhost:5173**

### 4. Production build

```bash
npm run build
npm run preview
```

### 5. Tests

Run the full frontend test suite once:

```bash
npm test
```

During development, use watch mode to rerun affected tests after each change:

```bash
npm run test:watch
```

To run the same quality checks used by CI:

```bash
npm test
npm run lint
npm run build
```

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home |
| `/products` | Public | Catalog |
| `/cart` | Public | Shopping cart |
| `/about`, `/contact` | Public | Static pages |
| `/login`, `/register` | Guest | Auth |
| `/checkout` | Auth | Checkout wizard |
| `/order-confirm` | Auth | Stripe return / order confirm |
| `/profile` | Auth | Account overview |
| `/profile/orders` | Auth | Customer order history |
| `/admin/*` | Admin / Seller | Dashboard, products, categories, orders, sellers |

SPA deep links on Vercel are handled via `vercel.json` rewrites to `index.html`.

---

## Project structure

```
src/
├── api/                 # Axios instance + CSRF interceptor
├── components/
│   ├── admin/           # Dashboard, products, categories, orders, sellers
│   ├── auth/            # Login / Register
│   ├── cart/
│   ├── checkout/        # Address, Stripe, confirmation
│   ├── home/
│   ├── product/
│   ├── profile/         # Profile + My Orders
│   └── shared/          # Navbar, cards, loaders, modals
├── hooks/               # URL-driven product/order filters
├── store/
│   ├── actions/         # API thunks
│   └── reducers/        # auth, cart, products, orders, …
├── utils/               # Formatting + validated dashboard table queries
├── App.jsx
└── main.jsx
```

---

## Backend integration

This app expects **sb-ecom** with CORS allowing the frontend origin and JWT auth enabled.

| Concern | How it works |
|---------|----------------|
| API base | `${VITE_BACK_END_URL}/api` |
| Auth | Login stores only non-sensitive profile data locally; the JWT remains in an HTTP-only cookie |
| CSRF | Axios fetches `/auth/csrf` and attaches the returned token to state-changing requests |
| Cookies | Sent with `withCredentials: true`; production uses `Secure` + `SameSite=None` |
| Images | Product records contain secure Cloudinary URLs returned by the API |

Dashboard tables keep `page`, `sortBy`, and `sortOrder` in the URL. The URL is
the single source of truth for pagination and sorting, so moving between pages,
using browser navigation, or refreshing the page does not silently change the
selected ordering.

Typical local workflow:

1. Start Postgres + `sb-ecom`
2. Configure `.env` as above
3. `npm run dev`
4. Register a user, browse, checkout; use an admin account for `/admin`

---

## Deploy (Vercel)

1. Import this GitHub repo into Vercel (Framework: Vite, output: `dist`)
2. Set Production env vars:

```env
VITE_BACK_END_URL=https://p01--sb-ecom--ccxd59t2vl2x.code.run
VITE_FRONTEND_URL=https://YOUR-VERCEL-APP.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. Deploy, then set `VITE_FRONTEND_URL` to the real Vercel domain and **Redeploy**. Vite embeds `VITE_*` variables during the build, so changing a value requires a new deployment.
4. In Northflank, set `FRONTEND_URL` to that exact Vercel origin (no trailing slash) and redeploy the backend service.

`vercel.json` already rewrites all routes to `index.html` so `/profile`, `/order-confirm`, etc. work on refresh.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm test` | Run all frontend tests once |
| `npm run test:watch` | Rerun tests while developing |

---

## Continuous integration

GitHub Actions runs the frontend quality checks on every pull request targeting
`main` and every push to `main`:

1. Install the locked dependencies with `npm ci`
2. Run the Vitest suite
3. Run ESLint
4. Build the production bundle

The workflow is defined in `.github/workflows/frontend-ci.yml` and requires no
repository secrets.

The current suite contains **38 passing tests** across reducers, protected
routes, cart behaviour, formatting utilities, and dashboard query state.

---

## Related

- Backend: [Derek376/sb-ecom](https://github.com/Derek376/sb-ecom)
- Author: [Derek376](https://github.com/Derek376)

---

## License

MIT — see [LICENSE](LICENSE).
