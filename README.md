# Agnexa Fire Safety Platform

Modern Indian fire safety ecommerce and service platform for certified products, GST billing, bulk quotations, AMC management, QR product tracking, installation bookings, refill reminders, and compliance dashboards.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma ORM and PostgreSQL
- Auth.js credentials and Google login
- Razorpay payments, COD, and UPI-ready checkout structure
- Cloudinary image uploads
- QR code generation
- REST API routes

## Features

- Premium light ecommerce UI with white cards, soft grey backgrounds, red/orange accents, polished shadows, and responsive layouts
- Fire safety audit form with building risk score, compliance actions, product suggestions, and report-ready fields
- AMC management with plans, renewals, inspection reminders, technician scheduling, and maintenance logs
- QR-based extinguisher tracking with asset tags, QR generation, inspection history, refill history, expiry alerts, warranty tracking, and health status
- Bulk business quotation flow with GSTIN, contractor pricing, urgency, quantity, and enterprise inquiry fields
- Installation, refill, inspection, and AMC service booking
- Notification structure for expiry, refill, AMC renewal, inspection, emergency, WhatsApp, SMS, email, and in-app channels
- E-commerce system with catalog, detail pages, cart, checkout, Razorpay, COD, GST totals, wishlist, reviews, filters, search, and admin product management
- Customer dashboard and admin dashboard for products, inventory, AMC, services, quotes, QR assets, compliance, and analytics

## Getting Started

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Admin Login

- Email: `admin@agnexa.com`
- Password: `Admin@12345`

Change this before production.

## Environment Variables

Use `.env.example` as the source of truth:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Production Notes

- Connect `pdfkit` to generate GST invoices and safety audit PDFs.
- Connect SMS and WhatsApp providers such as Twilio, Interakt, Gupshup, or Meta WhatsApp Cloud API in the notification route.
- For multi-warehouse inventory, add `Warehouse` and `InventoryMovement` models.
