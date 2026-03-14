# SamaanDena - Product Requirements Document

## Original Problem Statement
A responsive, mobile-friendly website for a goods delivery service named "samaandena.com" that connects local shops in rural areas with users based on their location.

## Core Features
- **User Roles**: Customer, Shop Owner, Delivery Agent
- **User Flow**: Browse shops -> Add to cart -> Place order -> Track delivery
- **Authentication**: Email/password + phone number (JWT-based)
- **Payment**: Cash on Delivery (COD) v1
- **Design**: Vibrant, colorful UI for rural audiences with custom SVG logo
- **PWA**: Installable as app on mobile/desktop devices

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB (motor driver)
- **Auth**: JWT + bcrypt
- **PWA**: Service Worker + Web App Manifest

## DB Schema
- `users`: {email, phone, password_hash, role, name, location}
- `shops`: {owner_id, name, description, location}
- `products`: {shop_id, name, description, price, stock}
- `orders`: {customer_id, shop_id, items, total_price, status, delivery_agent_id}
- `reviews`: {user_id, entity_id, entity_type, rating, comment}

## What's Been Implemented
### Completed (March 2026)
- [x] Full-stack app: FastAPI backend + React frontend + MongoDB
- [x] Auth system (register/login for 3 roles)
- [x] Shop & product management APIs
- [x] Order placement & delivery agent assignment APIs
- [x] Review/rating system APIs
- [x] Landing page with custom SVG logo
- [x] Customer, Shop Owner, Delivery Agent dashboards
- [x] Navbar with role-based navigation
- [x] **PWA Implementation** (March 14, 2026):
  - Service Worker registered and active
  - Valid manifest.json with proper icons (192px, 512px)
  - Generated PNG icons and favicon
  - Install prompt banner with auto-show after 3s
  - Manual install guide for iOS/Chrome/other browsers
  - Dismiss with 7-day localStorage memory
- [x] Backend health endpoint (`/api/health`)
- [x] Frontend compiles without errors

## Testing Status
- All PWA tests passed (100% backend, 100% frontend) - iteration_2.json
- Service worker: registered, active, correct scope
- Manifest: valid JSON, proper icons, standalone display
- Install banner: renders, dismiss works, manual guide works

## Backlog / Future Tasks
### P1
- Payment gateway integration (Stripe/Razorpay beyond COD)
- Real-time order tracking enhancements

### P2
- Rating/review system UI improvements
- Location-based shop discovery
- Push notifications for order updates
- Offline mode with service worker caching

### P3
- Multi-language support (Hindi/English)
- Admin dashboard
- Analytics & reporting
