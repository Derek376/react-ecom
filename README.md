# react-ecom

Modern e-commerce storefront built with React — product browsing, cart, checkout, Stripe payments, user profile/orders, and admin/seller dashboards.

Backend API: **[sb-ecom](https://github.com/Derek376/sb-ecom)** (Spring Boot + PostgreSQL)

---

## Live demo

| | URL |
|---|-----|
| **Storefront** | https://react-ecom-zeta.vercel.app |
| **API docs (Swagger)** | https://sb-ecom-vbza.onrender.com/swagger-ui/index.html |
| **Backend repo** | [Derek376/sb-ecom](https://github.com/Derek376/sb-ecom) |

> The API runs on Render’s free tier and may take **30–60s** to wake on the first request.

---

## Highlights

- Responsive storefront with product grid, filters, and cart
- Auth flows with **JWT Bearer token** (works across Vercel ↔ Render; cookies also supported)
- Multi-step **checkout** (address → payment method → summary → Stripe)
- **Profile** + **My Orders** for customers
- **Admin / Seller** panels (products, categories, orders, sellers, analytics)
- Deployed on **Vercel** against a live Spring Boot API on **Render** + **Neon** Postgres

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
| Routing | React Router 7 |
| Styling | Tailwind CSS 4, Material UI 9 |
| HTTP | Axios (`withCredentials` + Bearer interceptor) |
| Forms | React Hook Form |
| Payments | Stripe React / Stripe.js (test mode) |
| UX | React Hot Toast, Swiper, skeletons |

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
- PayPal option shown as unavailable (UI placeholder)

### Admin / Seller
- Dashboard analytics (admin)
- Manage categories, products, images
- Manage sellers (admin)
- View / update order status

---

## Quick start (local)

### Prerequisites

- Node.js 18+
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
├── api/                 # Axios instance + Bearer interceptor
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
├── utils/
├── App.jsx
└── main.jsx
```

---

## Backend integration

This app expects **sb-ecom** with CORS allowing the frontend origin and JWT auth enabled.

| Concern | How it works |
|---------|----------------|
| API base | `${VITE_BACK_END_URL}/api` |
| Auth | Login stores user + `jwtToken` in `localStorage`; Axios sends `Authorization: Bearer …` |
| Cookies | Still sent (`withCredentials: true`) for same-site / supporting clients |
| Images | Product `image` URLs come from the API (`IMAGE_BASE_URL` on the server) |

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
VITE_BACK_END_URL=https://sb-ecom-vbza.onrender.com
VITE_FRONTEND_URL=https://YOUR-VERCEL-APP.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. Deploy — then set the same `VITE_FRONTEND_URL` to the real domain and **Redeploy**
4. On Render, set `FRONTEND_URL` to that exact Vercel origin (no trailing slash) and redeploy the API

`vercel.json` already rewrites all routes to `index.html` so `/profile`, `/order-confirm`, etc. work on refresh.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

---

## Related

- Backend: [Derek376/sb-ecom](https://github.com/Derek376/sb-ecom)
- Author: [Derek376](https://github.com/Derek376)

---

## License

MIT — see [LICENSE](LICENSE).
