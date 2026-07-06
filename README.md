# react-ecom — E-commerce Frontend

Single-page e-commerce storefront built with React. Connects to the [sb-ecom](https://github.com/Derek376/sb-ecom) Spring Boot API for products, authentication, cart sync, addresses, and order placement.

## Tech Stack

- **React 19** + **Vite 8**
- **Redux Toolkit** — global state (products, cart, auth, checkout)
- **React Router 7** — client-side routing
- **Tailwind CSS 4** + **Material UI 9** — styling and form controls
- **Axios** — HTTP client with cookie-based auth
- **React Hook Form** — form handling
- **React Hot Toast** — notifications
- **Swiper** — homepage carousel

## Features

- Browse products with pagination, category filters, and keyword search
- Product detail modal with add-to-cart
- Persistent shopping cart (localStorage + server sync at checkout)
- User registration and login (JWT via HTTP-only cookies)
- Protected checkout flow for authenticated users
- Shipping address management (add, list, select, delete)
- Payment method selection (Stripe / PayPal UI)
- Responsive layout with loading skeletons and error handling

## Prerequisites

- Node.js 18+ and npm
- [sb-ecom](../sb-ecom) backend running at `http://localhost:8080`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_BACK_END_URL=http://localhost:8080
```

> `.env` is gitignored. The API client in `src/api/api.js` reads this value and sends requests to `${VITE_BACK_END_URL}/api` with credentials enabled.

### 3. Start the dev server

```bash
npm run dev
```

The app runs at **http://localhost:5173** by default.

### 4. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home page with hero banner |
| `/products` | Public | Product listing with filters |
| `/cart` | Public | Shopping cart |
| `/about` | Public | About page |
| `/contact` | Public | Contact page |
| `/login` | Guest only | Sign in |
| `/register` | Guest only | Create account |
| `/checkout` | Authenticated | Address, payment, and order summary |

## Project Structure

```
src/
├── api/              # Axios instance (base URL, credentials)
├── components/
│   ├── auth/         # Login, Register
│   ├── cart/         # Cart page and item controls
│   ├── checkout/     # Checkout flow (address, payment, summary)
│   ├── home/         # Home page and hero banner
│   ├── product/      # Product listing and filters
│   └── shared/       # Navbar, cards, loaders, modals
├── store/
│   ├── actions/      # Async Redux thunks (API calls)
│   └── reducers/     # Redux slices (products, cart, auth, etc.)
├── App.jsx           # Router and layout
└── main.jsx          # App entry with Redux Provider
```

## Backend Integration

This frontend expects the sb-ecom API to be available and CORS-configured for `http://localhost:5173/`.

Typical workflow:

1. Start PostgreSQL and the sb-ecom backend
2. Set `VITE_BACK_END_URL=http://localhost:8080` in `.env`
3. Run `npm run dev`
4. Register a new account or sign in, then browse products and proceed to checkout

Cart items are stored locally until checkout, when they are synced to the server cart via the API.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## License

MIT — see [LICENSE](LICENSE) for details.
